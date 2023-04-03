import classNames from "classnames/bind";
import styles from "./Landscape.module.scss";

const cx = classNames.bind(styles);

function Landscape({ children }) {
	return (
		<div className={cx("wrapper")}>
			<h1>Landscape layout</h1>
			{children}
		</div>
	);
}

export default Landscape;
