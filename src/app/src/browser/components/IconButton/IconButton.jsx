import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./IconButton.module.scss";

const cx = classNames.bind(styles);

IconButton.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.string,
	onClick: PropTypes.func
}

IconButton.defaultProps = {
	onClick: () => {}
}

function IconButton({ className, icon, onClick }) {
	return (
		<button className={cx('button', className)} onClick={onClick}>
			<i className={icon}></i>
		</button>
	);
}

export default IconButton;
