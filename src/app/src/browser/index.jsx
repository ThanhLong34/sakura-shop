import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { browserRoutes } from "@/router";
import { DefaultLayout } from "./layouts";

function renderRoutes(playerAccount) {
	if (browserRoutes) {
		let routes = browserRoutes;

		if (!playerAccount) {
			routes = routes.filter((route) => route.access === "public");
		}

		return routes.map((route, idx) => {
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
							<Page />
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
		<div className="browser">
			<Routes>{renderRoutes(playerAccount)}</Routes>
		</div>
	);
}

export default Browser;
