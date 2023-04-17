import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./TextLink.module.scss";

const cx = classNames.bind(styles);

TextLink.propTypes = {
	className: PropTypes.string,
	to: PropTypes.string.isRequired,
};

function TextLink({ children, className, to }) {
	return (
		<Link className={cx("link", className)} to={to}>
			{children}
		</Link>
	);
}

export default memo(TextLink);
