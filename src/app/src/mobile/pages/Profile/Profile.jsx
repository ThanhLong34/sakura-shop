import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePlayerAccountEmail, updatePlayerAccountNickname, logoutPlayerAccount } from "@/store/playerSlice";
import playerApi from "@/apis/playerApi";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

import AccountIcon from "@/assets/images/AccountIcon.png";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const cx = classNames.bind(styles);

function Profile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const playerAccount = useSelector((state) => state.player.account);

	//? States
	const [dialogVisible, setDialogVisible] = useState(false);

	//? Refs
	const toastRef = useRef(null);
	const emailRef = useRef(null);
	const nicknameRef = useRef(null);
	const newPasswordRef = useRef(null);

	useEffect(() => {
		emailRef.current.value = playerAccount?.email ?? "";
		nicknameRef.current.value = playerAccount?.nickname ?? "";
	}, []);

	//? Handles
	async function handleUpdatePassword() {
		const newPassword = newPasswordRef.current?.value.trim();

		if (!newPassword) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Mật khẩu không được để trống",
				life: 3000,
			});
			return;
		}

		const response = await playerApi.updatePassword({ id: +playerAccount.id, newPassword });

		if (response.code === 1) {
			toastRef.current.show({
				severity: "success",
				summary: "Thành công",
				detail: "Cập nhật mật khẩu thành công",
				life: 3000,
			});

			setDialogVisible(false);
		} else {
			toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
		}
	}
	async function handleUpdateEmail() {
		const email = emailRef.current?.value.trim();

		if (!email) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Email không được để trống",
				life: 3000,
			});
			return;
		}

		const response = await playerApi.updateEmail({ id: +playerAccount.id, email });

		if (response.code === 1) {
			toastRef.current.show({
				severity: "success",
				summary: "Thành công",
				detail: "Cập nhật email thành công",
				life: 3000,
			});

			const action = updatePlayerAccountEmail(email);
			dispatch(action);
		} else {
			toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
		}
	}
	async function handleUpdateNickname() {
		const nickname = nicknameRef.current?.value.trim();

		if (!nickname) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Tên người chơi không được để trống",
				life: 3000,
			});
			return;
		}

		const response = await playerApi.updateNickname({ id: +playerAccount.id, nickname: nickname });

		if (response.code === 1) {
			toastRef.current.show({
				severity: "success",
				summary: "Thành công",
				detail: "Cập nhật tên người chơi thành công",
				life: 3000,
			});

			const action = updatePlayerAccountNickname(nickname);
			dispatch(action);
		} else {
			toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
		}
	}
	const handleLogout = () => {
		dispatch(logoutPlayerAccount());
		navigate("/");
	};

	return (
		<>
			{createPortal(<Toast ref={toastRef} position="top-center" />, document.body)}
			<Dialog
				header="Thay đổi mật khẩu"
				visible={dialogVisible}
				style={{ width: "330px" }}
				onHide={() => setDialogVisible(false)}
			>
				<span className="p-input-icon-left w-full mb-3">
					<i className="pi pi-lock"></i>
					<InputText ref={newPasswordRef} className="w-full" type="password" placeholder="Nhập mật khẩu mới" />
				</span>
				<Button className="w-full" label="Lưu mật khẩu" severity="help" outlined onClick={handleUpdatePassword} />
			</Dialog>

			<div className={cx("wrapper")}>
				<div className="card">
					<img className={cx("profile-icon")} src={AccountIcon} alt="profile" />
					<div className="grid mt-2">
						<div className="col-12">
							<div className="col-12 mb-2">
								<h4 className="mb-2">Tên người chơi:</h4>
								<span className="p-input-icon-left w-full mb-3">
									<i className="pi pi-user"></i>
									<InputText
										ref={nicknameRef}
										className="w-full"
										type="text"
										placeholder="Nhập tên người chơi"
									/>
								</span>
								<Button
									className="w-full"
									label="Lưu tên người chơi"
									outlined
									icon="pi pi-save"
									onClick={handleUpdateNickname}
								/>
							</div>
							<div className="col-12 mb-2">
								<h4 className="mb-2">Email:</h4>
								<span className="p-input-icon-left w-full mb-3">
									<i className="pi pi-envelope"></i>
									<InputText ref={emailRef} className="w-full" type="email" placeholder="Nhập email" />
								</span>
								<Button
									className="w-full"
									label="Lưu Email"
									icon="pi pi-save"
									outlined
									onClick={handleUpdateEmail}
								/>
							</div>
							<div className="col-12 mb-3">
								<h4 className="mb-2">Thay đổi mật khẩu</h4>
								<Button
									className="w-full"
									label="Thay đổi mật khẩu"
									severity="warning"
									outlined
									icon="pi pi-lock"
									onClick={() => setDialogVisible(true)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
