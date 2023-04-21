import { useRef, useState } from "react";
import PropTypes from "prop-types";

import gameDataApi from "@/apis/gameDataApi";

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
	const [gameData, setGameData] = useState({
		title: "",
		value: "",
	});

	//? Handles
	const handleSetGameDataField = (field, value) => {
		setGameData((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};
	const handleCloseDialog = () => {
		setGameData({
			title: "",
			value: "",
		});

		setVisible(false);
	};
	const handleSubmit = () => {
		if (!gameData.title) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập tên dữ liệu (bắt buộc)",
				life: 3000,
			});
			return;
		}

		if (!gameData.value) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập giá trị dữ liệu (bắt buộc)",
				life: 3000,
			});
			return;
		}

		gameDataApi.add(gameData).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo dữ liệu trò chơi thành công",
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
			<Toast ref={toastRef} />
			<Dialog header="THÊM DỮ LIỆU TRÒ CHƠI" visible={visible} style={{ width: "620px" }} onHide={handleCloseDialog}>
			<div className="mb-4">
					<span className="block mb-2">
						Tên dữ liệu <span className="text-red-500">*</span>
					</span>
					<InputText
						value={gameData.title}
						className="w-full"
						placeholder="Nhập tên dữ liệu *"
						onChange={(e) => handleSetGameDataField("title", e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<span className="block mb-2">
						Giá trị dữ liệu <span className="text-red-500">*</span>
					</span>
					<InputText
						value={gameData.value}
						className="w-full"
						placeholder="Nhập giá trị dữ liệu *"
						onChange={(e) => handleSetGameDataField("value", e.target.value)}
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
