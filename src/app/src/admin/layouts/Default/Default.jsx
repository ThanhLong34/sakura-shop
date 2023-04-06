import { useLocation } from "react-router-dom";
import { adminRoutes } from "@/router";
import classNames from "classnames/bind";
import styles from "./Default.module.scss";

import "@/assets/styles/adminLayout.css";
import logo from "@/assets/images/LogoDark.png";
import MenuList from "@/admin/components/MenuList";

const cx = classNames.bind(styles);

function Default({ children }) {
	const location = useLocation();
	const breadcrumb = adminRoutes.find((route) => route.path === location.pathname)?.metadata?.title ?? "Không xác định";

	return (
		<div className="layout-container layout-light layout-colorscheme-menu layout-static">
			<div className="layout-sidebar">
				<img className="app-logo" src={logo} alt="logo brand" />
				<div className="layout-menu-container">
					<MenuList />
				</div>
			</div>
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
