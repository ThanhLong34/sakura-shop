import classNames from "classnames/bind";
import styles from "./Default.module.scss";
import Navigator from "@/browser/components/Navigator/Navigator";

const cx = classNames.bind(styles);

function Default({children}) {
	return (
		<div className={cx("wrapper")}>
			<Navigator />
			{children}
		</div>
	);
}

export default Default;
