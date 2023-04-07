import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function Profile() {
	// Store
	const adminAccount = useSelector((state) => state.admin.account);

	// Refs
	const emailRef = useRef(null);
	const phoneNumberRef = useRef(null);

	useEffect(() => {
		emailRef.current.value = adminAccount?.email ?? "";
		phoneNumberRef.current.value = adminAccount?.phoneNumber ?? "";
	}, []);

	return (
		<div>
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
							<Button className="w-full" label="Thay đổi email" outlined />
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
		</div>
	);
}

export default Profile;
