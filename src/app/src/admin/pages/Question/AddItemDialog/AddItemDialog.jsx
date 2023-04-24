import { useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AddItemDialog.module.scss";
import { getInputNumberValue } from "@/helpers/converter";

import questionApi from "@/apis/questionApi";

// Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";

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
	const contentRef = useRef(null);
	const healthRewardRef = useRef(null);
	const starRewardRef = useRef(null);
	const diamondRewardRef = useRef(null);

	//? Handles
	const handleCloseDialog = () => {
		contentRef.current.value = null;
		healthRewardRef.current.getInput().value = null;
		starRewardRef.current.getInput().value = null;
		diamondRewardRef.current.getInput().value = null;

		setVisible(false);
	};
	const handleSubmit = () => {
		const data = {
			content: contentRef.current?.value.trim(),
			healthReward: getInputNumberValue(healthRewardRef.current.getInput().value),
			starReward: getInputNumberValue(starRewardRef.current.getInput().value),
			diamondReward: getInputNumberValue(diamondRewardRef.current.getInput().value),
		};

		if (!data.content) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập nội dung câu hỏi (bắt buộc)",
				life: 3000,
			});
			return;
		}

		questionApi.add(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo câu hỏi thành công",
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
			<Dialog header="THÊM CÂU HỎI" visible={visible} style={{ width: "620px" }} onHide={handleCloseDialog}>
				<div className="mb-4">
					<span className="block mb-2">
						Nội dung câu hỏi <span className="text-red-500">*</span>
					</span>
					<InputTextarea
						ref={contentRef}
						className="w-full"
						placeholder="Nhập nội dung câu hỏi *"
						autoResize
						rows={5}
					/>
				</div>
				<div className="mb-4 flex">
					<span className={cx("item-icon")}>
						<img src={HealthIcon} alt="health icon" />
					</span>
					<InputNumber
						ref={healthRewardRef}
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
						ref={starRewardRef}
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
						ref={diamondRewardRef}
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
