import { memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./GradientText.module.scss";

const cx = classNames.bind(styles);

GradientText.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(["primary", "secondary"]),
};

function GradientText({ children, className, type }) {
	return <span className={cx("text", className, type)}>{children}</span>;
}

export default memo(GradientText);
