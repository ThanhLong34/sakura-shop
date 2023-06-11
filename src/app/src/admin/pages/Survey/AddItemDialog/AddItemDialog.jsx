import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AddItemDialog.module.scss";

import surveyApi from "@/apis/surveyApi";
import { getInputNumberValue } from "@/helpers/converter";

// Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

AddItemDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	onSubmitted: PropTypes.func,
};

AddItemDialog.defaultProps = {
	onSubmitted: () => {},
};

const cx = classNames.bind(styles);

function AddItemDialog({ visible, setVisible, onSubmitted }) {
	//? Refs
	const toastRef = useRef(null);
	const titleRef = useRef(null);
	const formLinkRef = useRef(null);
	const spreadsheetLinkRef = useRef(null);
	const getListPhoneNumberApiRef = useRef(null);
	const iframeSourceRef = useRef(null);
	const healthRewardRef = useRef(null);
	const starRewardRef = useRef(null);
	const diamondRewardRef = useRef(null);

	//? Handles
	const handleCloseDialog = () => {
		titleRef.current.value = null;
		formLinkRef.current.value = null;
		spreadsheetLinkRef.current.value = null;
		getListPhoneNumberApiRef.current.value = null;
		iframeSourceRef.current.value = null;
		healthRewardRef.current.getInput().value = null;
		starRewardRef.current.getInput().value = null;
		diamondRewardRef.current.getInput().value = null;

		setVisible(false);
	};
	const handleSubmit = () => {
		const data = {
			title: titleRef.current?.value.trim(),
			formLink: formLinkRef.current?.value.trim(),
			spreadsheetLink: spreadsheetLinkRef.current?.value.trim(),
			getListPhoneNumberApi: getListPhoneNumberApiRef.current?.value.trim(),
			iframeSource: iframeSourceRef.current?.value.trim(),
			healthReward: getInputNumberValue(healthRewardRef.current.getInput().value),
			starReward: getInputNumberValue(starRewardRef.current.getInput().value),
			diamondReward: getInputNumberValue(diamondRewardRef.current.getInput().value),
		};

		if (!data.title) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập tiêu đề khảo sát (bắt buộc)",
				life: 3000,
			});
			return;
		}

		surveyApi.add(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo khảo sát thành công",
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
			<Dialog header="THÊM KHẢO SÁT" visible={visible} style={{ width: "620px" }} onHide={handleCloseDialog}>
				<div className="mb-4">
					<span className="block mb-2">
						Tiêu đề khảo sát <span className="text-red-500">*</span>
					</span>
					<InputText ref={titleRef} className="w-full" placeholder="Nhập tiêu đề khảo sát *" />
				</div>
				<div className="mb-4">
					<span className="block mb-2">Liên kết biểu mẫu (google form)</span>
					<InputText ref={formLinkRef} className="w-full" placeholder="Nhập liên kết biểu mẫu (google form)" />
				</div>
				<div className="mb-4">
					<span className="block mb-2">Liên kết bảng tính (google spreadsheet)</span>
					<InputText
						ref={spreadsheetLinkRef}
						className="w-full"
						placeholder="Nhập liên kết bảng tính (google spreadsheet)"
					/>
				</div>
				<div className="mb-4">
					<span className="block mb-2">API lấy danh sách số điện thoại</span>
					<InputText
						ref={getListPhoneNumberApiRef}
						className="w-full"
						placeholder="Nhập API lấy danh sách số điện thoại"
					/>
				</div>
				<div className="mb-4">
					<span className="block mb-2">Liên kết thẻ iframe</span>
					<InputText ref={iframeSourceRef} className="w-full" placeholder="Nhập liên kết thẻ iframe" />
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
