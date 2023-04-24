import { useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import advertisementTypeApi from "@/apis/advertisementTypeApi";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";

UpdateItemDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	item: PropTypes.object,
	onSubmitted: PropTypes.func,
};

UpdateItemDialog.defaultProps = {
	item: {},
	onSubmitted: () => {},
};

function UpdateItemDialog({ visible, setVisible, item, onSubmitted }) {
	//? Refs
	const toastRef = useRef(null);
	const nameRef = useRef(null);

	//? Handles
	const handleBindingData = () => {
		if (item) {
			nameRef.current.value = item.name;
		}
	};
	const handleCloseDialog = () => {
		nameRef.current.value = null;

		setVisible(false);
	};
	const handleSubmit = () => {
		const name = nameRef.current?.value.trim();

		if (!name) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập tên loại quảng cáo (bắt buộc)",
				life: 3000,
			});
			return;
		}
		const data = {
			id: item.id,
			name: name !== item.name ? name : null,
		};

		advertisementTypeApi.update(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Cập nhật loại quảng cáo thành công",
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
			<Dialog
				header="THAY ĐỔI LOẠI QUẢNG CÁO"
				visible={visible}
				onShow={handleBindingData}
				style={{ width: "620px" }}
				onHide={handleCloseDialog}
			>
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

export default UpdateItemDialog;
