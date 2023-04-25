import classNames from "classnames/bind";
import styles from "./Empty.module.scss";

const cx = classNames.bind(styles);

function Empty({children}) {
	return (
		<div className={cx("wrapper")}>
			{children}
		</div>
	);
}

export default Empty;
