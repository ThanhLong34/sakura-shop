import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";

const cx = classNames.bind(styles);

function MenuItem({label, icon}) {
	return (
		<li className="active-menuitem">
			<a className="p-ripple active-route" href="/apollo-react/">
				<i className={`layout-menuitem-icon ${icon}`}></i>
				<span className="layout-menuitem-text">{label}</span>
				<span role="presentation" className="p-ink"></span>
			</a>
		</li>
	);
}

export default MenuItem;
