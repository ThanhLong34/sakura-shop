import { useLocation } from "react-router-dom";
import { adminRoutes } from "@/router";

import "@/assets/styles/adminLayout.css";
import Sidebar from "@/admin/components/Sidebar";

function Default({ children }) {
	const location = useLocation();
	const breadcrumb = adminRoutes.find((route) => route.path === location.pathname)?.metadata?.title ?? "Không xác định";

	return (
		<div className="layout-container layout-light layout-colorscheme-menu layout-static">
			<Sidebar />
			<div className="layout-content-wrapper">
				<div className="layout-topbar">
					<div className="topbar-start">
						<button type="button" className="topbar-menubutton p-link p-trigger">
							<i className="pi pi-bars"></i>
						</button>
						<div className="topbar-breadcrumb">
							<nav className="layout-breadcrumb">
								<ol>
									<li>{breadcrumb}</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>
				<div className="layout-content">{children}</div>
			</div>
		</div>
	);
}

export default Default;
