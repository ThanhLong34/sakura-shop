import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./GradientButton.module.scss";

const cx = classNames.bind(styles);

GradientButton.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(['primary', 'secondary']),
	onClick: PropTypes.func,
};

GradientButton.defaultProps = {
	onClick: () => {},
};

function GradientButton({ children, className, type, onClick }) {
	return (
		<button className={cx("button", className, type)} onClick={onClick}>
			{children}
		</button>
	);
}

export default GradientButton;
