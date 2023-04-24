import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

const Input = forwardRef(({ className, type, label, icon, placeholder, inputType, isRequired, isInvalid }, ref) => {
	const inputRef = useRef(null);

	useImperativeHandle(
		ref,
		() => ({
			getValue() {
				return inputRef.current?.value.trim() ?? null;
			},
			reset() {
				if (inputRef.current) {
					inputRef.current.value = null;
				}
			},
		}),
		[]
	);

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
				<input
					ref={inputRef}
					className={cx("input", type, { invalid: isInvalid })}
					type={inputType}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
});

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

export default memo(Input);
