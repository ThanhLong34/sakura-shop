import classNames from "classnames/bind";
import styles from "./BrandLogo.module.scss";
import Logo from "@/assets/images/LogoX250.png";

const cx = classNames.bind(styles);

function BrandLogo() {
	return (
		<div className={cx("brand-logo")}>
			<img src={Logo} alt="brand logo" />
		</div>
	);
}

export default BrandLogo;
