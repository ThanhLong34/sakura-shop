import { memo } from "react";
import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";

import GradientButton from "../GradientButton";
import TextLink from "../TextLink";
import Input from "../Input/Input";

const cx = classNames.bind(styles);

function LoginForm() {
	return (
		<div className="wrapper">
			<h3 className={cx("title")}>ĐĂNG NHẬP VÀO TRÒ CHƠI</h3>

			<Input label="Số điện thoại" placeholder="Hãy nhập số điện thoại" icon="pi pi-phone" isRequired />
			<Input
				className="mt-4"
				type="password"
				label="Mật khẩu"
				placeholder="Hãy nhập mật khẩu"
				icon="pi pi-lock"
				isRequired
			/>

			<GradientButton type="primary" className={cx("login-button", "mt-5 w-full")}>
				VÀO CHƠI THÔI NÀO
			</GradientButton>

			<h4 className="mt-5">
				Bạn chưa có tài khoản? <TextLink to="">Đăng ký ngay</TextLink>
			</h4>
		</div>
	);
}

export default memo(LoginForm);
