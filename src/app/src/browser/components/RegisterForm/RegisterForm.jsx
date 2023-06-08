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

import GradientButton from "../GradientButton";
import TextButton from "../TextButton";
import IconButton from "../IconButton";
import Input from "../Input";
import { Toast } from "primereact/toast";

const cx = classNames.bind(styles);

RegisterForm.propTypes = {
	onGoBack: PropTypes.func,
	onShowLoginForm: PropTypes.func,
};

RegisterForm.defaultProps = {
	onGoBack: () => {},
	onShowLoginForm: () => {},
};

function RegisterForm({ onGoBack, onShowLoginForm }) {
	//?
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//? Refs
	const toastRef = useRef(null);
	const emailRef = useRef(null);
	const phoneNumberRef = useRef(null);
	const passwordRef = useRef(null);

	//? Handles
	const handleRegister = useCallback(
		async (e) => {
			e.preventDefault();

			const phoneNumber = phoneNumberRef.current?.getValue();
			const password = passwordRef.current?.getValue();
			const email = emailRef.current?.getValue();

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
		<form
			className={cx("wrapper", "zoomin animation-duration-500 animation-iteration-1 animation-ease-out")}
			onSubmit={handleRegister}
		>
			{createPortal(<Toast ref={toastRef} position="top-right" />, document.body)}

			<IconButton className={cx("go-back-button")} icon="pi pi-chevron-left" onClick={onGoBack} />
			<h3 className={cx("title")}>ĐĂNG KÝ TÀI KHOẢN</h3>

			<Input
				ref={phoneNumberRef}
				label="Số điện thoại"
				placeholder="Hãy nhập số điện thoại"
				icon="pi pi-phone"
				isRequired
			/>
			<Input
				ref={passwordRef}
				className="mt-4"
				inputType="password"
				label="Mật khẩu"
				placeholder="Hãy nhập mật khẩu"
				icon="pi pi-lock"
				isRequired
			/>
			<Input
				ref={emailRef}
				className="mt-4"
				inputType="email"
				label="Địa chỉ Email"
				placeholder="Hãy nhập địa chỉ Email"
				icon="pi pi-envelope"
				isRequired
			/>

			<GradientButton type="primary" className={cx("login-button", "mt-5 w-full")} buttonType="submit">
				XÁC NHẬN ĐĂNG KÝ
			</GradientButton>

			<h4 className="mt-5">
				Bạn đã có tài khoản?{" "}
				<TextButton onlyText onClick={onShowLoginForm}>
					Đăng nhập ngay
				</TextButton>
			</h4>
		</form>
	);
}

export default memo(RegisterForm);
