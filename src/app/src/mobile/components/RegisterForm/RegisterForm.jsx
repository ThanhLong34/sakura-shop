import { memo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./RegisterForm.module.scss";

import playerApi from "@/apis/playerApi";
import limitedNumbersApi from "@/apis/limitedNumbersApi";
import { validateEmail, validatePhoneNumber } from "@/helpers/validator";
import { loginPlayerAccount } from "@/store/playerSlice";

import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const cx = classNames.bind(styles);

RegisterForm.propTypes = {
	onGoBack: PropTypes.func,
};

RegisterForm.defaultProps = {
	onGoBack: () => {},
};

function RegisterForm({ onGoBack }) {
	//?
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//? Refs
	const toastRef = useRef(null);
	const emailRef = useRef(null);
	const phoneNumberRef = useRef(null);
	const passwordRef = useRef(null);

	//? Handles
	const handleRegister = useCallback(async (e) => {
		e.preventDefault();

		const phoneNumber = phoneNumberRef.current?.value;
		const password = passwordRef.current?.value;
		const email = emailRef.current?.value;

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

		if (!email) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Bạn chưa nhập địa chỉ Email",
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

			const registerResponse = await playerApi.register({ phoneNumber, password, email });
			const getLimitedNumbersResponse = await limitedNumbersApi.login({ playerId: +registerResponse.data.id });
			const errorMessage = registerResponse.message || getLimitedNumbersResponse.message;

			if (registerResponse.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành công",
					detail: "Chúc mừng bạn, đăng ký thành công",
					life: 5000,
				});

				const account = {
					...registerResponse.data,
					id: +registerResponse.data.id,
					remainingQuestions: +getLimitedNumbersResponse.data.remainingQuestions,
					remainingAdvertisements: +getLimitedNumbersResponse.data.remainingAdvertisements,
				};

				const action = loginPlayerAccount(account);
				dispatch(action);

				navigate("/dashboard");
			} else {
				toastRef.current.show({ severity: "error", summary: "Lỗi", detail: errorMessage, life: 3000 });
			}
		},
		[]
	);

	return (
		<form className={cx("wrapper")} onSubmit={handleRegister}>
			{createPortal(<Toast ref={toastRef} position="top-center" />, document.body)}

			<h3 className={cx("title", "mb-3")}>ĐĂNG KÝ TÀI KHOẢN</h3>

			<span className="p-input-icon-left w-full mb-3">
				<i className="pi pi-phone"></i>
				<InputText ref={phoneNumberRef} className="w-full" placeholder="Hãy nhập số điện thoại" />
			</span>
			<span className="p-input-icon-left w-full mb-3">
				<i className="pi pi-lock"></i>
				<InputText ref={passwordRef} className="w-full" type="password" placeholder="Hãy nhập mật khẩu" />
			</span>
			<span className="p-input-icon-left w-full mb-3">
				<i className="pi pi-envelope"></i>
				<InputText ref={emailRef} className="w-full" type="email" placeholder="Hãy nhập địa chỉ Email" />
			</span>

			<Button
				label="Xác nhận đăng ký"
				className={cx("login-button", "mb-3 w-full")}
				type="submit"
				severity="warning"
			/>
			<Button
				label="Quay lại"
				className={cx("login-button", "mb-3 w-full")}
				onClick={onGoBack}
				severity="info"
				outlined
			/>
		</form>
	);
}

export default memo(RegisterForm);
