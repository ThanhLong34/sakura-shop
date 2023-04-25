import classNames from "classnames/bind";
import styles from "./Portrait.module.scss";

const cx = classNames.bind(styles);

function Portrait({ children }) {
	return (
		<div className={cx("wrapper")}>
			{children}
		</div>
	);
}

export default Portrait;
