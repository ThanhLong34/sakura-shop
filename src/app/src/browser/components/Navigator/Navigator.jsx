import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Navigator.module.scss";

const cx = classNames.bind(styles);

function Navigator() {
	return (
		<nav className={cx("navigator")}>
			<NavLink
				to="/"
				className={ cx("link") }
			>
				Màn hình chính
			</NavLink>
			<NavLink
				to="/admin/login"
				className={cx("link")}
			>
				Đăng nhập Admin
			</NavLink>
		</nav>
	);
}

export default Navigator;
