import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./TextButton.module.scss";

const cx = classNames.bind(styles);

TextButton.propTypes = {
	className: PropTypes.string,
	buttonType: PropTypes.oneOf(["submit", "button"]),
	isRouteLink: PropTypes.bool,
	navigateTo: PropTypes.string,
	onlyText: PropTypes.bool,
	onClick: PropTypes.func,
};

TextButton.defaultProps = {
	buttonType: "button",
	isRouteLink: false,
	onlyText: false,
	onClick: () => {},
};

function TextButton({ children, className, buttonType, isRouteLink, navigateTo, onlyText, onClick }) {
	let Component = "button";

	if (isRouteLink) {
		Component = Link;
	}

	return (
		<Component to={navigateTo} className={cx("button", className, { onlyText })} onClick={onClick} type={buttonType}>
			{children}
		</Component>
	);
}

export default memo(TextButton);
