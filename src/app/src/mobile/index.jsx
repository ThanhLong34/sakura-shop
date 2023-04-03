import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMobileOrientation } from "react-device-detect";
import { mobileRoutes } from "@/router";
import { PortraitLayout, LandscapeLayout } from "./layouts";
import { useMemo } from "react";

function renderRoutes(predicate) {
	if (mobileRoutes) {
		return mobileRoutes.map((route, idx) => {
			const Page = route.component;
			let Layout = PortraitLayout;

			if (typeof predicate === "function") {
				if (predicate()) {
					Layout = LandscapeLayout;
				}
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
	const { isLandscape } = useMobileOrientation();
	const routesRendered = useMemo(() => renderRoutes(() => isLandscape), [isLandscape]);

	return (
		<Router>
			<Routes>{routesRendered}</Routes>
		</Router>
	);
}

export default Mobile;
