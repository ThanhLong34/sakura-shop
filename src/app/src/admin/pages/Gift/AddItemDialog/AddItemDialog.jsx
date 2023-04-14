import { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AddItemDialog.module.scss";
import { getInputNumberValue } from "@/helpers/converter";

import giftApi from "@/apis/giftApi";
import imageFileApi from "@/apis/imageFileApi";

// Icons
import StarIcon from "@/assets/images/star.png";
import DiamondIcon from "@/assets/images/diamond.png";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";

const cx = classNames.bind(styles);

//? Templates
const chooseOptions = {
	icon: "pi pi-fw pi-images",
	iconOnly: true,
	className: "custom-choose-btn p-button-rounded p-button-outlined",
};
const uploadOptions = {
	icon: "pi pi-fw pi-cloud-upload",
	iconOnly: true,
	className: "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
};
const cancelOptions = {
	icon: "pi pi-fw pi-times",
	iconOnly: true,
	className: "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
};

AddItemDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
};

// setVisible là 1 SetStateAction
// visible & item là các State
// Nên không cần dùng memo, useCallback, useMemo

function AddItemDialog({ visible, setVisible, onSubmitted }) {
	//? Variables
	const imageIdUploaded = useRef(null);

	//? Refs
	const toastRef = useRef(null);
	const nameRef = useRef(null);
	const brandRef = useRef(null);
	const descriptionRef = useRef(null);
	const starCostRef = useRef(null);
	const diamondCostRef = useRef(null);
	const fileUploadRef = useRef(null);

	//? States
	const [totalSize, setTotalSize] = useState(0);
	const [allowToReceiveOnline, setAllowToReceiveOnline] = useState(false);
	const [isShow, setIsShow] = useState(true);

	//? Handles
	const handleSelectFile = (e) => {
		let _totalSize = 0;
		let files = e.files;

		Object.keys(files).forEach((key) => {
			_totalSize += files[key].size || 0;
		});

		setTotalSize(_totalSize);
	};
	const handleUploadFile = (e) => {
		const imageFile = e.files[0];

		imageFileApi.upload(imageFile).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành công",
					detail: "Tải ảnh lên máy chủ thành công",
				});

				imageIdUploaded.current = +response.data.id;
			} else {
				toastRef.current.show({ severity: "error", summary: "Lỗi", detail: "Tải ảnh lên máy chủ thất bại" });
			}
		});
	};
	const handleRemoveFile = (file, callback) => {
		setTotalSize(totalSize - file.size);
		callback();

		imageIdUploaded.current = null;
	};
	const handleClearFile = () => {
		setTotalSize(0);

		imageIdUploaded.current = null;
	};
	const handleValidationFailFile = () => {
		toastRef.current.show({
			severity: "error",
			summary: "Lỗi",
			detail: "Kích thước hình ảnh không hợp lệ",
			life: 3000,
		});
	};
	const handleCloseDialog = () => {
		setVisible(false);
	};
	const handleSubmit = () => {
		const data = {
			name: nameRef.current?.value.trim(),
			brand: brandRef.current?.value.trim(),
			description: descriptionRef.current?.value.trim(),
			allowToReceiveOnline,
			isShow,
			starCost: getInputNumberValue(starCostRef.current.getInput().value),
			diamondCost: getInputNumberValue(diamondCostRef.current.getInput().value),
			imageId: imageIdUploaded.current,
		};

		if (!data.name) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập tên phần thưởng (bắt buộc)",
				life: 3000,
			});
			return;
		}

		if (!data.imageId) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa tải ảnh lên máy chủ (bắt buộc)",
				life: 3000,
			});
			return;
		}

		giftApi.add(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo phần thưởng thành công",
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

	//? Templates
	const headerUploadTemplate = (options) => {
		const { className, chooseButton, uploadButton, cancelButton } = options;
		const value = totalSize / 10000;
		const formatedValue =
			fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : "0 B";

		return (
			<div className={className} style={{ backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
				{chooseButton}
				{uploadButton}
				{cancelButton}
				<div className="flex align-items-center gap-3 ml-auto">
					<span>{formatedValue} / 2 MB</span>
					<ProgressBar value={value} showValue={false} style={{ width: "10rem", height: "12px" }}></ProgressBar>
				</div>
			</div>
		);
	};
	const itemUploadTemplate = (file, props) => {
		return (
			<div className="flex flex-column">
				<div
					className="flex justify-content-center justify-content-center mb-2"
					style={{ width: "100%", maxHeight: "200px" }}
				>
					<img className="" alt={file.name} role="presentation" src={file.objectURL} />
				</div>
				<div className="flex align-items-center align-items-center flex-wrap">
					<span className="flex flex-column text-left mr-5">
						{file.name}
						<small>{new Date().toLocaleDateString()}</small>
					</span>
					<Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
					<Button
						type="button"
						icon="pi pi-times"
						className="p-button-outlined p-button-rounded p-button-danger ml-auto"
						onClick={() => handleRemoveFile(file, props.onRemove)}
					/>
				</div>
			</div>
		);
	};
	const emptyUploadTemplate = () => {
		return (
			<div className="flex align-items-center flex-column">
				<i
					className="pi pi-image mt-3 p-5"
					style={{
						fontSize: "5em",
						borderRadius: "50%",
						backgroundColor: "var(--surface-b)",
						color: "var(--surface-d)",
					}}
				></i>
				<span style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }} className="my-5">
					Kéo thả hình ảnh vào đây
				</span>
			</div>
		);
	};

	return (
		<>
			<Toast ref={toastRef} />
			<Dialog header="THÊM PHẦN THƯỞNG" visible={visible} style={{ width: "620px" }} onHide={handleCloseDialog}>
				<div className="mb-4">
					<span className="block mb-2">Tên phần thưởng *</span>
					<InputText ref={nameRef} className="w-full" placeholder="Nhập tên phần thưởng *" />
				</div>
				<div className="mb-4">
					<span className="block mb-2">Thương hiệu</span>
					<InputText ref={brandRef} className="w-full" placeholder="Nhập thương hiệu" />
				</div>
				<div className="mb-4">
					<span className="block mb-2">Mô tả</span>
					<InputTextarea ref={descriptionRef} className="w-full" placeholder="Nhập mô tả" autoResize rows={5} />
				</div>
				<div className="grid">
					<div className="col-6">
						<div className="mb-4">
							<span className="block mb-2">Có thể nhận Online</span>
							<InputSwitch checked={allowToReceiveOnline} onChange={(e) => setAllowToReceiveOnline(e.value)} />
						</div>
					</div>
					<div className="col-6">
						<div className="mb-4">
							<span className="block mb-2">Hiển thị</span>
							<InputSwitch checked={isShow} onChange={(e) => setIsShow(e.value)} />
						</div>
					</div>
				</div>
				<div className="mb-4 flex">
					<span className={cx("item-icon")}>
						<img src={StarIcon} alt="start icon" />
					</span>
					<InputNumber
						ref={starCostRef}
						className="w-full"
						mode="decimal"
						placeholder="Nhập chi phí sao"
						showButtons
						min={0}
					/>
				</div>
				<div className="mb-4 flex">
					<span className={cx("item-icon")}>
						<img src={DiamondIcon} alt="diamond icon" />
					</span>
					<InputNumber
						ref={diamondCostRef}
						className="w-full"
						mode="decimal"
						placeholder="Nhập chi phí kim cương"
						showButtons
						min={0}
					/>
				</div>
				<div className="mb-4">
					<span className="block mb-2">Hình ảnh *</span>

					<Tooltip target=".custom-choose-btn" content="Chọn ảnh" position="bottom" />
					<Tooltip target=".custom-upload-btn" content="Tải ảnh lên máy chủ" position="bottom" />
					<Tooltip target=".custom-cancel-btn" content="Xóa" position="bottom" />

					<FileUpload
						ref={fileUploadRef}
						accept="image/*"
						invalidFileSizeMessageDetail="Kích thước hình ảnh vượt quá quy định"
						invalidFileSizeMessageSummary="Kích thước hình ảnh không hợp lệ"
						maxFileSize={2000000}
						onSelect={handleSelectFile}
						onClear={handleClearFile}
						onValidationFail={handleValidationFailFile}
						customUpload
						uploadHandler={handleUploadFile}
						headerTemplate={headerUploadTemplate}
						itemTemplate={itemUploadTemplate}
						emptyTemplate={emptyUploadTemplate}
						chooseOptions={chooseOptions}
						uploadOptions={uploadOptions}
						cancelOptions={cancelOptions}
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
