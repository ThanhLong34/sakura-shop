import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoutes } from "@/router";
import { DefaultLayout } from "./layouts";

function renderRoutes() {
	if (adminRoutes) {
		return adminRoutes.map((route, idx) => {
			const Page = route.component;
			let Layout = DefaultLayout;
			let redirectTo;

			if (route.layout) {
				Layout = route.layout;
			}

			if (route.redirect) {
				redirectTo = route.redirect;
			}

			return (
				<Route
					key={idx}
					path={route.path}
					element={
						<Layout>
							{redirectTo ? <Navigate to={redirectTo} /> : <Page />}
						</Layout>
					}
				/>
			);
		});
	}
}

function Admin() {
	return (
		<div className="admin">
			<Routes>{renderRoutes()}</Routes>
		</div>
	);
}

export default Admin;
