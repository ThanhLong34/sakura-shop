import classNames from "classnames/bind";
import styles from "./Landscape.module.scss";

const cx = classNames.bind(styles);

function Landscape({ children }) {
	return (
		<div className={cx("wrapper")}>
			{children}
		</div>
	);
}

export default Landscape;
