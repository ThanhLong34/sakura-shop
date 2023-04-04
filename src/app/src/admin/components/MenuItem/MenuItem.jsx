import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ label, icon, redirectTo }) {
	return (
		<li className="active-menuitem">
			<NavLink to={redirectTo} className="p-ripple active-route">
				<i className={`layout-menuitem-icon ${icon}`}></i>
				<span className="layout-menuitem-text">{label}</span>
				<span role="presentation" className="p-ink"></span>
			</NavLink>
		</li>
	);
}

export default MenuItem;
