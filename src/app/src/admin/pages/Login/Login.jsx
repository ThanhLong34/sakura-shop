import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import bg from "@/assets/svg/admin-login-bg.svg";

const cx = classNames.bind(styles);

function Login() {
	return (
		<div className={cx("wrapper")}>
			<img className="fixed left-0 top-0 min-h-screen min-w-screen" src={bg} alt="background vector" />
		</div>
	);
}

export default Login;
