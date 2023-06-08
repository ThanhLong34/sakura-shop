import { memo, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";

import playerApi from "@/apis/playerApi";
import limitedNumbersApi from "@/apis/limitedNumbersApi";
import { validateEmail, validatePhoneNumber } from "@/helpers/validator";
import { loginPlayerAccount } from "@/store/playerSlice";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const cx = classNames.bind(styles);

LoginForm.propTypes = {
	onGoBack: PropTypes.func,
};

LoginForm.defaultProps = {
	onGoBack: () => {},
};

function LoginForm({ onGoBack }) {
	//?
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//? States
	const [resetPasswordDialogVisible, setResetPasswordDialogVisible] = useState(false);
	const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

	//? Refs
	const toastRef = useRef(null);
	const emailRef = useRef(null);
	const phoneNumberRef = useRef(null);
	const passwordRef = useRef(null);

	//? Handles
	const handleResetPassword = useCallback(async () => {
		const email = emailRef.current?.value.trim();

		if (!email) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Bạn chưa nhập địa chỉ Email tài khoản",
				life: 3000,
			});
			return;
		}

		if (!validateEmail(email)) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Không đúng định dạng địa chỉ Email",
				life: 3000,
			});
			return;
		}

		// Show loading
		setResetPasswordLoading(true);
		const response = await playerApi.resetPassword({ email });
		// Hide loading
		setResetPasswordLoading(false);

		if (response.code === 1) {
			toastRef.current.show({
				severity: "success",
				summary: "Thành công",
				detail: "Mật khẩu mới đã được tạo thành công, hãy kiểm tra hộp thư Email của bạn",
				life: 15000,
			});

			setResetPasswordDialogVisible(false);
		} else {
			toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
		}
	}, []);
	const handleLogin = useCallback(async (e) => {
		e.preventDefault();

		const phoneNumber = phoneNumberRef.current?.value;
		const password = passwordRef.current?.value;

		if (!phoneNumber) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Bạn chưa nhập số điện thoại",
				life: 3000,
			});
			return;
		}

		if (!validatePhoneNumber(phoneNumber)) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Không đúng định dạng số điện thoại",
				life: 3000,
			});
			return;
		}

		if (!password) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Bạn chưa nhập mật khẩu",
				life: 3000,
			});
			return;
		}

		const loginResponse = await playerApi.login({ phoneNumber, password });
		const getLimitedNumbersResponse = await limitedNumbersApi.login({ playerId: +loginResponse.data.id });
		const errorMessage = loginResponse.message || getLimitedNumbersResponse.message;

		if (loginResponse.code === 1) {
			toastRef.current.show({
				severity: "success",
				summary: "Thành công",
				detail: "Chúc mừng bạn, đăng nhập thành công",
				life: 5000,
			});

			const account = {
				...loginResponse.data,
				id: +loginResponse.data.id,
				health: +loginResponse.data.health,
				star: +loginResponse.data.star,
				diamond: +loginResponse.data.diamond,
				experience: +loginResponse.data.experience,
				level: +loginResponse.data.level,
				remainingQuestions: +getLimitedNumbersResponse.data.remainingQuestions,
				remainingAdvertisements: +getLimitedNumbersResponse.data.remainingAdvertisements,
			};

			const loginPlayerAccountAction = loginPlayerAccount(account);
			dispatch(loginPlayerAccountAction);

			navigate("/dashboard");
		} else {
			toastRef.current.show({ severity: "error", summary: "Lỗi", detail: errorMessage, life: 3000 });
		}
	}, []);

	return (
		<form className={cx("wrapper")} onSubmit={handleLogin}>
			{createPortal(<Toast ref={toastRef} position="top-center" />, document.body)}

			<Dialog
				header="Lấy lại mật khẩu"
				visible={resetPasswordDialogVisible}
				style={{ maxWidth: "330px" }}
				onHide={() => setResetPasswordDialogVisible(false)}
			>
				<p className="mt-2 mb-3">Chúng tôi sẽ gửi mật khẩu mới về địa chỉ Email của bạn</p>
				<span className="p-input-icon-left w-full mb-3">
					<i className="pi pi-envelope"></i>
					<InputText
						ref={emailRef}
						className="w-full"
						type="email"
						placeholder="Hãy nhập địa chỉ Email tài khoản"
					/>
				</span>
				<Button
					className="w-full"
					label="Xác nhận lấy lại mật khẩu"
					severity="help"
					outlined
					loading={resetPasswordLoading}
					onClick={handleResetPassword}
				/>
			</Dialog>

			<h3 className={cx("title", "mb-3")}>ĐĂNG NHẬP VÀO TRÒ CHƠI</h3>

			<span className="p-input-icon-left w-full mb-3">
				<i className="pi pi-phone"></i>
				<InputText ref={phoneNumberRef} className="w-full" placeholder="Hãy nhập số điện thoại" />
			</span>
			<span className="p-input-icon-left w-full mb-2">
				<i className="pi pi-lock"></i>
				<InputText ref={passwordRef} className="w-full" type="password" placeholder="Hãy nhập mật khẩu" />
			</span>

			<div
				className={cx("text-left mb-3", "forgot-password-text")}
				onClick={() => setResetPasswordDialogVisible(true)}
			>
				Nhấn vào đây nếu bạn quên mật khẩu!
			</div>

			<Button label="Vào chơi thôi nào" className={cx("login-button", "mb-3 w-full")} type="submit" />
			<Button
				label="Quay lại"
				className={cx("login-button", "w-full")}
				onClick={onGoBack}
				severity="info"
				outlined
			/>
		</form>
	);
}

export default memo(LoginForm);
