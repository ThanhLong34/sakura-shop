import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { browserRoutes } from "@/router";
import { DefaultLayout } from "./layouts";

function renderRoutes() {
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
							<Page />
						</Layout>
					}
				/>
			);
		});
	}
}

function Browser() {
	return (
		<Router>
			<Routes>{renderRoutes()}</Routes>
		</Router>
	);
}

export default Browser;
