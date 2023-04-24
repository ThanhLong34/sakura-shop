import { useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import advertisementTypeApi from "@/apis/advertisementTypeApi";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";


AddItemDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	onSubmitted: PropTypes.func,
};

AddItemDialog.defaultProps = {
	onSubmitted: () => {},
};

function AddItemDialog({ visible, setVisible, onSubmitted }) {
	//? Refs
	const toastRef = useRef(null);
	const nameRef = useRef(null);

	//? Handles
	const handleCloseDialog = () => {
		nameRef.current.value = null;

		setVisible(false);
	};
	const handleSubmit = () => {
		const data = {
			name: nameRef.current?.value.trim(),
		};

		if (!data.name) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập tên loại quảng cáo (bắt buộc)",
				life: 3000,
			});
			return;
		}

		advertisementTypeApi.add(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo loại quảng cáo thành công",
					life: 3000,
				});

				handleCloseDialog();
				onSubmitted();
			} else {
				toastRef.current.show({
					severity: "error",
					summary: "Lỗi",
					detail: response.message,
					life: 3000,
				});
			}
		});
	};

	return (
		<>
			{createPortal(<Toast ref={toastRef} />, document.body)}
			<Dialog header="THÊM LOẠI QUẢNG CÁO" visible={visible} style={{ width: "620px" }} onHide={handleCloseDialog}>
				<div className="mb-4">
					<span className="block mb-2">
						Tên loại quảng cáo <span className="text-red-500">*</span>
					</span>
					<InputText ref={nameRef} className="w-full" placeholder="Nhập tên loại quảng cáo *" />
				</div>
				<div className="flex justify-content-end pt-2">
					<Button className="mr-3" label="Xác nhận" severity="info" onClick={handleSubmit} />
					<Button label="Hủy" severity="info" outlined onClick={handleCloseDialog} />
				</div>
			</Dialog>
		</>
	);
}

export default AddItemDialog;
