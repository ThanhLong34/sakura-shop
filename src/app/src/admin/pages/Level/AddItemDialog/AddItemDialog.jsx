import { useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AddItemDialog.module.scss";
import { getInputNumberValue } from "@/helpers/converter";

import levelApi from "@/apis/levelApi";

// Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import ExperienceIcon from "@/assets/images/ExperienceIcon.png";
import LevelIcon from "@/assets/images/LevelIcon.png";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

const cx = classNames.bind(styles);

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
	const levelRef = useRef(null);
	const experienceRef = useRef(null);
	const healthRef = useRef(null);
	const starRef = useRef(null);
	const diamondRef = useRef(null);

	//? Handles
	const handleCloseDialog = () => {
		levelRef.current.getInput().value = null;
		experienceRef.current.getInput().value = null;
		healthRef.current.getInput().value = null;
		starRef.current.getInput().value = null;
		diamondRef.current.getInput().value = null;

		setVisible(false);
	};
	const handleSubmit = () => {
		const data = {
			levelNumber: getInputNumberValue(levelRef.current.getInput().value),
			experienceRequired: getInputNumberValue(experienceRef.current.getInput().value),
			healthReward: getInputNumberValue(healthRef.current.getInput().value),
			starReward: getInputNumberValue(starRef.current.getInput().value),
			diamondReward: getInputNumberValue(diamondRef.current.getInput().value),
		};

		if (isNaN(data.levelNumber)) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập cấp độ (bắt buộc)",
				life: 3000,
			});
			return;
		}

		if (isNaN(data.experienceRequired)) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập điểm kinh nghiệm yêu cầu (bắt buộc)",
				life: 3000,
			});
			return;
		}

		levelApi.add(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo cấp độ thành công",
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
				header="THÊM CẤP ĐỘ NGƯỜI CHƠI"
				visible={visible}
				style={{ width: "420px" }}
				onHide={handleCloseDialog}
			>
				<div className="mb-4 flex">
					<span className={cx("item-icon")}>
						<img src={LevelIcon} alt="level icon" />
					</span>
					<InputNumber
						ref={levelRef}
						className="w-full"
						mode="decimal"
						placeholder="Nhập cấp độ *"
						showButtons
						min={0}
					/>
				</div>
				<div className="mb-4 flex">
					<span className={cx("item-icon")}>
						<img src={ExperienceIcon} alt="experience icon" />
					</span>
					<InputNumber
						ref={experienceRef}
						className="w-full"
						mode="decimal"
						placeholder="Nhập điểm kinh nghiệm yêu cầu *"
						showButtons
						min={0}
					/>
				</div>
				<div className="mb-4 flex">
					<span className={cx("item-icon")}>
						<img src={HealthIcon} alt="health icon" />
					</span>
					<InputNumber
						ref={healthRef}
						className="w-full"
						mode="decimal"
						placeholder="Nhập thưởng sức khỏe"
						showButtons
						min={0}
					/>
				</div>
				<div className="mb-4 flex">
					<span className={cx("item-icon")}>
						<img src={StarIcon} alt="start icon" />
					</span>
					<InputNumber
						ref={starRef}
						className="w-full"
						mode="decimal"
						placeholder="Nhập thưởng sao"
						showButtons
						min={0}
					/>
				</div>
				<div className="mb-4 flex">
					<span className={cx("item-icon")}>
						<img src={DiamondIcon} alt="diamond icon" />
					</span>
					<InputNumber
						ref={diamondRef}
						className="w-full"
						mode="decimal"
						placeholder="Nhập thưởng kim cương"
						showButtons
						min={0}
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
