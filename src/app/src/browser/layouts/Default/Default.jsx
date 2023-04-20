import classNames from "classnames/bind";
import styles from "./Default.module.scss";

import BrandLogo from "@/browser/components/BrandLogo";
import Navigator from "@/browser/components/Navigator";
import Profile from "@/browser/components/Profile";

const cx = classNames.bind(styles);

function Default({ children }) {
	return (
		<div className={cx("wrapper")}>
			<BrandLogo />
			<Profile />
			<Navigator />
			<div className={cx('content')}>{children}</div>
		</div>
	);
}

export default Default;
