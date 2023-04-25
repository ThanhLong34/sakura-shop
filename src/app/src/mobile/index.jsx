import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { mobileRoutes } from "@/router";
import { PortraitLayout } from "./layouts";

function renderRoutes(playerAccount) {
	if (mobileRoutes) {
		let routes = mobileRoutes;

		if (!playerAccount) {
			routes = routes.filter((route) => route.access === "public");
		}

		return routes.map((route, idx) => {
			const Page = route.component;
			let Layout = PortraitLayout;

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

function Mobile() {
	const playerAccount = useSelector((state) => state.player.account);
	// const routesRendered = useMemo(() => renderRoutes(playerAccount, isLandscape), [isLandscape]);

	return (
		<div className="mobile">
			<Routes>{renderRoutes(playerAccount)}</Routes>
		</div>
	);
}

export default Mobile;
