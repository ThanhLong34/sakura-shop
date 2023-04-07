import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminAccountEmail } from "@/store/adminSlice";
import adminApi from "@/apis/adminApi";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

function Profile() {
	// Store
	const dispatch = useDispatch();
	const adminAccount = useSelector((state) => state.admin.account);

	// Refs
	const toastRef = useRef(null);
	const emailRef = useRef(null);
	const phoneNumberRef = useRef(null);

	useEffect(() => {
		emailRef.current.value = adminAccount?.email ?? "";
		phoneNumberRef.current.value = adminAccount?.phoneNumber ?? "";
	}, []);

	async function handleUpdateEmail() {
		const email = emailRef.current?.value;

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

	return (
		<>
			<Toast ref={toastRef} position="top-center" />
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
							<Button className="w-full" label="Thay đổi số điện thoại" outlined />
						</div>
					</div>
					<div className="col-12 md:col-6 mt-4">
						<h4 className="mb-2">Thay đổi mật khẩu</h4>
						<Button className="w-full" label="Thay đổi mật khẩu" severity="warning" outlined />
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
