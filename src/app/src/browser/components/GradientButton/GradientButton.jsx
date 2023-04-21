import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./GradientButton.module.scss";

const cx = classNames.bind(styles);

GradientButton.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(["primary", "secondary"]),
	buttonType: PropTypes.oneOf(["submit", "button"]),
	isRouteLink: PropTypes.bool,
	navigateTo: PropTypes.string,
	onClick: PropTypes.func,
};

GradientButton.defaultProps = {
	buttonType: "button",
	isRouteLink: false,
	onClick: () => {},
};

function GradientButton({ children, className, type, buttonType, isRouteLink, navigateTo, onClick }) {
	let Component = "button";

	if (isRouteLink) {
		Component = Link;
	}

	return (
		<Component to={navigateTo} className={cx("button", className, type)} onClick={onClick} type={buttonType}>
			{children}
		</Component>
	);
}

export default memo(GradientButton);
