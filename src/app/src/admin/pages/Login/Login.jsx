import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { loginAdminAccount } from "@/store/adminSlice.js";
import adminApi from "@/apis/adminApi";

import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const cx = classNames.bind(styles);

function BackgroundVector() {
	return (
		<svg
			className="fixed left-0 top-0 min-h-screen min-w-screen"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1600 800"
			preserveAspectRatio="none"
		>
			<rect fill="#6366f1" width="1600" height="800"></rect>
			<path
				fill="#8183f4"
				d="M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"
			></path>
			<path
				fill="#9ea0f6"
				d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"
			></path>
			<path
				fill="#bcbdf9"
				d="M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"
			></path>
			<path
				fill="#dadafc"
				d="M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"
			></path>
		</svg>
	);
}

function Login() {
	//?
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//? States
	const [dialogVisible, setDialogVisible] = useState(false);
	const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

	//? Refs
	const toastRef = useRef(null);
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const emailRef = useRef(null);

	async function handleLogin(e) {
		e.preventDefault();

		const username = usernameRef.current?.value.trim();
		const password = passwordRef.current?.value.trim();

		if (!username) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Bạn chưa nhập tên đăng nhập",
				life: 3000,
			});
			return;
		}

		if (!password) {
			toastRef.current.show({ severity: "error", summary: "Lỗi", detail: "Bạn chưa nhập mật khẩu", life: 3000 });
			return;
		}

		const response = await adminApi.login({ username, password });

		if (response.code === 1) {
			toastRef.current.show({
				severity: "success",
				summary: "Thành công",
				detail: "Đăng nhập thành công",
				life: 3000,
			});

			const account = {
				...response.data,
				id: +response.data.id,
			};

			const action = loginAdminAccount(account);
			dispatch(action);
		} else {
			toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
		}
	}

	function handleBack() {
		navigate("/");
	}

	async function handleResetPassword() {
		const email = emailRef.current?.value.trim();

		if (!email) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Bạn chưa nhập email tài khoản",
				life: 3000,
			});
			return;
		}

		// Show loading
		setResetPasswordLoading(true);

		const response = await adminApi.resetPassword({ email });

		// Hide loading
		setResetPasswordLoading(false);

		if (response.code === 1) {
			toastRef.current.show({
				severity: "success",
				summary: "Thành công",
				detail: "Mật khẩu mới đã được tạo thành công, hãy kiểm tra email của bạn",
				life: 3000,
			});

			setDialogVisible(false);
		} else {
			toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
		}
	}

	return (
		<div className={cx("login")}>
			{createPortal(<Toast ref={toastRef} />, document.body)}
			<Dialog
				header="Reset mật khẩu"
				visible={dialogVisible}
				style={{ width: "500px" }}
				onHide={() => setDialogVisible(false)}
			>
				<span className="p-input-icon-left w-full mb-4">
					<i className="pi pi-envelope"></i>
					<InputText ref={emailRef} className="w-full" type="email" placeholder="Email tài khoản" />
				</span>
				<Button
					className="w-full"
					label="Gửi"
					severity="help"
					outlined
					loading={resetPasswordLoading}
					onClick={handleResetPassword}
				/>
			</Dialog>

			<BackgroundVector />
			<div className="px-5 min-h-screen flex justify-content-center align-items-center">
				<div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
					<div className="mb-4">
						<div className="text-900 text-xl font-bold mb-2">HỆ THỐNG QUẢN TRỊ</div>
						<span className="text-600 font-medium">Nhập thông tin đăng nhập</span>
					</div>
					<form className="flex flex-column md:w-25rem" onSubmit={handleLogin}>
						<span className="p-input-icon-left w-full mb-4">
							<i className="pi pi-user"></i>
							<InputText ref={usernameRef} className="w-full" type="text" placeholder="Tên đăng nhập" />
						</span>
						<span className="p-input-icon-left w-full mb-4">
							<i className="pi pi-lock"></i>
							<InputText ref={passwordRef} className="w-full" type="password" placeholder="Mật khẩu" />
						</span>
						<div className="mb-4 flex flex-wrap gap-3">
							<div>
								<div className="p-checkbox p-component mr-2">
									<Checkbox disabled />
								</div>
								<label htmlFor="checkbox" className="text-900 font-medium mr-8">
									Ghi nhớ
								</label>
							</div>
							<a
								className="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300"
								onClick={(e) => {
									e.preventDefault() || setDialogVisible(true);
								}}
							>
								Reset mật khẩu
							</a>
						</div>
						<Button className="w-full" type="submit" label="Đăng nhập" raised />
						<Button className="w-full mt-3" label="Thoát" outlined raised onClick={handleBack} />
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
