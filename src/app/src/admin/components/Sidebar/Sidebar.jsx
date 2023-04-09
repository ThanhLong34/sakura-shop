import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import logo from "@/assets/images/LogoX500.png";
import MenuList from "@/admin/components/MenuList";

const cx = classNames.bind(styles);

function Sidebar() {
	return (
		<div className="layout-sidebar">
			<img className={cx("app-logo")} src={logo} alt="logo brand" />
			<div className="layout-menu-container">
				<MenuList />
			</div>
		</div>
	);
}

export default Sidebar;
