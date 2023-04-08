import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

MenuItem.propTypes = {
	label: PropTypes.string,
	icon: PropTypes.string,
	redirectTo: PropTypes.string,
	onClick: PropTypes.func
}

MenuItem.defaultProps = {
	onClick: () => {}
}

function MenuItem({ label, icon, redirectTo, onClick }) {
	function handleClick() {
		onClick();
	}

	return (
		<li className="active-menuitem">
			<NavLink to={redirectTo} className="p-ripple active-route" onClick={handleClick}>
				<i className={`layout-menuitem-icon ${icon}`}></i>
				<span className="layout-menuitem-text">{label}</span>
				<span role="presentation" className="p-ink"></span>
			</NavLink>
		</li>
	);
}

export default MenuItem;
