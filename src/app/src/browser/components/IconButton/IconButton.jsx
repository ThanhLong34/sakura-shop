import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./IconButton.module.scss";

const cx = classNames.bind(styles);

IconButton.propTypes = {
	className: PropTypes.string,
	isRouteLink: PropTypes.bool,
	navigateTo: PropTypes.string,
	icon: PropTypes.string,
	onClick: PropTypes.func,
};

IconButton.defaultProps = {
	isRouteLink: false,
	onClick: () => {},
};

function IconButton({ className, isRouteLink, navigateTo, icon, onClick }) {
	let Component = "button";

	if (isRouteLink) {
		Component = Link;
	}

	return (
		<Component to={navigateTo} className={cx("button", className)} onClick={onClick} type="button">
			<i className={ icon }></i>
		</Component>
	);
}

export default memo(IconButton);
