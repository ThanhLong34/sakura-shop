import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminAccountEmail, updateAdminAccountPhoneNumber } from "@/store/adminSlice";
import adminApi from "@/apis/adminApi";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

function Profile() {
	//? Store
	const dispatch = useDispatch();
	const adminAccount = useSelector((state) => state.admin.account);

	//? States
	const [dialogVisible, setDialogVisible] = useState(false);

	//? Refs
	const toastRef = useRef(null);
	const emailRef = useRef(null);
	const phoneNumberRef = useRef(null);
	const newPasswordRef = useRef(null);

	useEffect(() => {
		emailRef.current.value = adminAccount?.email ?? "";
		phoneNumberRef.current.value = adminAccount?.phoneNumber ?? "";
	}, []);

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

		const response = await adminApi.updatePassword({ id: adminAccount.id, newPassword });

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

		const response = await adminApi.updateEmail({ id: adminAccount.id, email });

		if (response.code === 1) {
			toastRef.current.show({
				severity: "success",
				summary: "Thành công",
				detail: "Cập nhật email thành công",
				life: 3000,
			});

			const action = updateAdminAccountEmail(email);
			dispatch(action);
		} else {
			toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
		}
	}

	async function handleUpdatePhoneNumber() {
		const phoneNumber = phoneNumberRef.current?.value.trim();

		if (!phoneNumber) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Số điện thoại không được để trống",
				life: 3000,
			});
			return;
		}

		const response = await adminApi.updatePhoneNumber({ id: adminAccount.id, phoneNumber });

		if (response.code === 1) {
			toastRef.current.show({
				severity: "success",
				summary: "Thành công",
				detail: "Cập nhật số điện thoại thành công",
				life: 3000,
			});

			const action = updateAdminAccountPhoneNumber(phoneNumber);
			dispatch(action);
		} else {
			toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
		}
	}

	return (
		<>
			{createPortal(<Toast ref={toastRef} position="top-center" />, document.body)}
			<Dialog
				header="Thay đổi mật khẩu"
				visible={dialogVisible}
				style={{ width: "320px" }}
				onHide={() => setDialogVisible(false)}
			>
				<span className="p-input-icon-left w-full mb-4">
					<i className="pi pi-lock"></i>
					<InputText ref={newPasswordRef} className="w-full" type="password" placeholder="Nhập mật khẩu mới" />
				</span>
				<Button className="w-full" label="Gửi" severity="help" outlined onClick={handleUpdatePassword} />
			</Dialog>

			<div className="card">
				<h2 className="text-center">Hồ sơ Admin</h2>
				<div className="grid mt-4">
					<div className="col-12 md:col-6">
						<div className="col-12">
							<h4 className="mb-2">Email:</h4>
							<span className="p-input-icon-left w-full mb-3">
								<i className="pi pi-envelope"></i>
								<InputText ref={emailRef} className="w-full" type="email" placeholder="Nhập email" />
							</span>
							<Button className="w-full" label="Thay đổi email" outlined onClick={handleUpdateEmail} />
						</div>
						<div className="col-12 mt-4">
							<h4 className="mb-2">Số điện thoại:</h4>
							<span className="p-input-icon-left w-full mb-3">
								<i className="pi pi-phone"></i>
								<InputText
									ref={phoneNumberRef}
									className="w-full"
									type="text"
									placeholder="Nhập số điện thoại"
								/>
							</span>
							<Button
								className="w-full"
								label="Thay đổi số điện thoại"
								outlined
								onClick={handleUpdatePhoneNumber}
							/>
						</div>
					</div>
					<div className="col-12 md:col-6 mt-4">
						<h4 className="mb-2">Thay đổi mật khẩu</h4>
						<Button
							className="w-full"
							label="Thay đổi mật khẩu"
							severity="warning"
							outlined
							onClick={() => setDialogVisible(true)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
