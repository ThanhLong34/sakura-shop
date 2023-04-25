import { memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Button } from "primereact/button";
import Profile from "../Profile/Profile";

const cx = classNames.bind(styles);

Header.propTypes = {
	onOpenSidebar: PropTypes.func,
};

Header.defaultProps = {
	onOpenSidebar: () => {},
};

function Header({ onOpenSidebar }) {
	return (
		<header className={cx("header")}>
			<Button icon="pi pi-bars" rounded text aria-label="Menu" className={cx("menu-btn")} onClick={onOpenSidebar} />
			<Profile />
		</header>
	);
}

export default memo(Header);
