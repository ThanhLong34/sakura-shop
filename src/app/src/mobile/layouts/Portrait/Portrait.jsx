import classNames from "classnames/bind";
import styles from "./Portrait.module.scss";
import Header from "@/mobile/components/Header/Header";

const cx = classNames.bind(styles);

function Portrait({ children }) {
	return (
		<div className={cx("wrapper")}>
			<Header />
			{children}
		</div>
	);
}

export default Portrait;
