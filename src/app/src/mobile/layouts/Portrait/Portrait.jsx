import classNames from "classnames/bind";
import styles from "./Portrait.module.scss";

const cx = classNames.bind(styles);

function Portrait({ children }) {
	return (
		<div className={cx("wrapper")}>
			<h1>Portrait layout</h1>
			{children}
		</div>
	);
}

export default Portrait;
