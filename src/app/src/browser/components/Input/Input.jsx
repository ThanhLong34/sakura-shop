import { memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

Input.propTypes = {
	type: PropTypes.oneOf(["primary", "secondary"]),
	className: PropTypes.string,
	label: PropTypes.string,
	icon: PropTypes.string,
	placeholder: PropTypes.string,
	inputType: PropTypes.string,
	isRequired: PropTypes.bool,
	isInvalid: PropTypes.bool,
};

Input.defaultProps = {
	inputType: "text",
	isRequired: false,
	isInvalid: false,
};

function Input({ className, type, label, icon, placeholder, inputType, isRequired, isInvalid }) {
	return (
		<div className={cx("wrapper", className, type)}>
			{label && (
				<p className={cx("label")}>
					{label} {isRequired && <span className={cx("required-sign")}>*</span>}
				</p>
			)}
			<div className={cx("input-wrapper")}>
				{icon && (
					<span className={cx("icon")}>
						<i className={icon} />
					</span>
				)}
				<input className={cx("input", type, { invalid: isInvalid })} type={inputType} placeholder={placeholder} />
			</div>
		</div>
	);
}

export default memo(Input);
