import { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./UpdateItemDialog.module.scss";
import { getInputNumberValue } from "@/helpers/converter";
import topicApi from "@/apis/topicApi";

// Icons
import HealthIcon from "@/assets/images/heart.png";
import StarIcon from "@/assets/images/star.png";
import DiamondIcon from "@/assets/images/diamond.png";
import ExperienceIcon from "@/assets/images/experience.png";
import LevelIcon from "@/assets/images/level.png";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

const cx = classNames.bind(styles);

UpdateItemDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	item: PropTypes.object,
};

UpdateItemDialog.defaultProps = {
	item: {},
};

// setVisible là 1 SetStateAction
// visible & item là các State
// Nên không cần dùng memo, useCallback, useMemo

function UpdateItemDialog({ visible, setVisible, item, onSubmitted }) {
	//? Refs
	const toastRef = useRef(null);
	const levelRef = useRef(null);
	const experienceRef = useRef(null);
	const healthRef = useRef(null);
	const starRef = useRef(null);
	const diamondRef = useRef(null);

	//? Handles
	const handleBindingData = () => {
		if (item) {
			levelRef.current.getInput().value = item.levelNumber;
			experienceRef.current.getInput().value = item.experienceRequired;
			healthRef.current.getInput().value = item.healthReward;
			starRef.current.getInput().value = item.starReward;
			diamondRef.current.getInput().value = item.diamondReward;
		}
	};
	const handleCloseDialog = () => {
		setVisible(false);
	};
	const handleSubmit = () => {
		const levelNumber = getInputNumberValue(levelRef.current.getInput().value);
		const experienceRequired = getInputNumberValue(experienceRef.current.getInput().value);
		const healthReward = getInputNumberValue(healthRef.current.getInput().value);
		const starReward = getInputNumberValue(starRef.current.getInput().value);
		const diamondReward = getInputNumberValue(diamondRef.current.getInput().value);

		const data = {
			id: item.id,
			levelNumber: levelNumber !== item.levelNumber ? levelNumber : null,
			experienceRequired: experienceRequired !== item.experienceRequired ? experienceRequired : null,
			healthReward: healthReward !== item.healthReward ? healthReward : null,
			starReward: starReward !== item.starReward ? starReward : null,
			diamondReward: diamondReward !== item.diamondReward ? diamondReward : null,
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

		topicApi.update(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Cập nhật cấp độ thành công",
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
			<Dialog
				header="THAY ĐỔI CẤP ĐỘ NGƯỜI CHƠI"
				visible={visible}
				onShow={handleBindingData}
				style={{ width: "620px" }}
				onHide={handleCloseDialog}
			>
				<div className="mb-4 flex">
					<span className={cx("item-icon")}>
						<img src={LevelIcon} alt="level icon" />
					</span>
					<InputNumber ref={levelRef} className="w-full" mode="decimal" placeholder="Nhập cấp độ *" showButtons />
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
					/>
				</div>
				<div className="mb-4 flex">
					<span className={cx("item-icon")}>
						<img src={StarIcon} alt="start icon" />
					</span>
					<InputNumber ref={starRef} className="w-full" mode="decimal" placeholder="Nhập thưởng sao" showButtons />
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
