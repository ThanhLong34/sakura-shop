import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import gameConventionApi from "@/apis/gameConventionApi";

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

	//? States
	const [gameConvention, setGameConvention] = useState({
		name: "",
		value: "",
	});

	//? Handles
	const handleSetGameConventionField = (field, value) => {
		setGameConvention((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};
	const handleBindingData = () => {
		if (item) {
			setGameConvention({
				...item,
			});
		}
	};
	const handleCloseDialog = () => {
		setGameConvention({
			name: "",
			value: "",
		});

		setVisible(false);
	};
	const handleSubmit = () => {
		if (!gameConvention.name) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập tên quy ước (bắt buộc)",
				life: 3000,
			});
			return;
		}

		if (!gameConvention.value) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập giá trị (bắt buộc)",
				life: 3000,
			});
			return;
		}

		const data = {
			id: item.id,
			name: gameConvention.name !== item.name ? gameConvention.name : null,
			value: gameConvention.value !== item.value ? gameConvention.value : null,
		};

		gameConventionApi.update(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Cập nhật quy ước trò chơi thành công",
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
				header="THAY ĐỔI QUY ƯỚC TRÒ CHƠI"
				visible={visible}
				onShow={handleBindingData}
				style={{ width: "620px" }}
				onHide={handleCloseDialog}
			>
				<div className="mb-4">
					<span className="block mb-2">
						Tên quy ước <span className="text-red-500">*</span>
					</span>
					<InputText
						value={gameConvention.name}
						className="w-full"
						placeholder="Nhập tên quy ước *"
						onChange={(e) => handleSetGameConventionField("name", e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<span className="block mb-2">
						Giá trị <span className="text-red-500">*</span>
					</span>
					<InputText
						value={gameConvention.value}
						className="w-full"
						placeholder="Nhập giá trị *"
						onChange={(e) => handleSetGameConventionField("value", e.target.value)}
					/>
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
