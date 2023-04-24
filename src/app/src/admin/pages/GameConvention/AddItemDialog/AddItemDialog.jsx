import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import gameConventionApi from "@/apis/gameConventionApi";

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

		gameConventionApi.add(gameConvention).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo quy ước trò chơi thành công",
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
			<Dialog header="THÊM QUY ƯỚC TRÒ CHƠI" visible={visible} style={{ width: "620px" }} onHide={handleCloseDialog}>
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

export default AddItemDialog;
