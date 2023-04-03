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
				Home
			</NavLink>
			<NavLink
				to="/about"
				className={cx("link")}
			>
				About
			</NavLink>
			<NavLink
				to="/shop"
				className={cx("link")}
			>
				Shop
			</NavLink>
		</nav>
	);
}

export default Navigator;
