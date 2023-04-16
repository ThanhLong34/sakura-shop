import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { browserRoutes } from "@/router";
import { DefaultLayout } from "./layouts";

function renderRoutes(playerAccount) {
	if (browserRoutes) {
		return browserRoutes.map((route, idx) => {
			const Page = route.component;
			let Layout = DefaultLayout;

			if (route.layout) {
				Layout = route.layout;
			}

			return (
				<Route
					key={idx}
					path={route.path}
					element={
						<Layout>
							{!playerAccount && route.access === "private" ? (
								<Navigate to="/" />
							) : (
								<Page />
							)}
						</Layout>
					}
				/>
			);
		});
	}
}

function Browser() {
	const playerAccount = useSelector((state) => state.player.account);

	return (
		<>
			<Routes>{renderRoutes(playerAccount)}</Routes>
		</>
	);
}

export default Browser;
