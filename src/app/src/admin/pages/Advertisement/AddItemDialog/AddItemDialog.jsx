import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AddItemDialog.module.scss";
import { getInputNumberValue } from "@/helpers/converter";

import advertisementTypeApi from "@/apis/advertisementTypeApi";
import advertisementApi from "@/apis/advertisementApi";
import imageFileApi from "@/apis/imageFileApi";
import videoFileApi from "@/apis/videoFileApi";

// Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { InputTextarea } from "primereact/inputtextarea";

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
	onSubmitted: PropTypes.func,
};

AddItemDialog.defaultProps = {
	onSubmitted: () => {},
};

function AddItemDialog({ visible, setVisible, onSubmitted }) {
	//? Variables
	const imageIdUploaded = useRef(null);
	const videoIdUploaded = useRef(null);

	//? Refs
	const toastRef = useRef(null);
	const imageFileUploadRef = useRef(null);
	const videoFileUploadRef = useRef(null);
	const titleRef = useRef(null);
	const descriptionRef = useRef(null);
	const durationRef = useRef(null);
	const healthRewardRef = useRef(null);
	const starRewardRef = useRef(null);
	const diamondRewardRef = useRef(null);

	//? States
	const [totalSizeImageFile, setTotalSizeImageFile] = useState(0);
	const [totalSizeVideoFile, setTotalSizeVideoFile] = useState(0);
	const [selectedAdvertisementTypeId, setSelectedAdvertisementTypeId] = useState(null);
	const [advertisementTypes, setAdvertisementTypes] = useState([]);
	const [occurrenceRate, setOccurrenceRate] = useState(100);

	//? Handles
	const handleSelectImageFile = (e) => {
		let _totalSize = 0;
		let files = e.files;

		Object.keys(files).forEach((key) => {
			_totalSize += files[key].size || 0;
		});

		setTotalSizeImageFile(_totalSize);
		imageIdUploaded.current = null;
	};
	const handleSelectVideoFile = (e) => {
		let _totalSize = 0;
		let files = e.files;

		Object.keys(files).forEach((key) => {
			_totalSize += files[key].size || 0;
		});

		setTotalSizeVideoFile(_totalSize);
		videoIdUploaded.current = null;
	};
	const handleUploadImageFile = (e) => {
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
	const handleUploadVideoFile = (e) => {
		const videoFile = e.files[0];

		videoFileApi.upload(videoFile).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành công",
					detail: "Tải video lên máy chủ thành công",
				});

				videoIdUploaded.current = +response.data.id;
			} else {
				toastRef.current.show({ severity: "error", summary: "Lỗi", detail: "Tải video lên máy chủ thất bại" });
			}
		});
	};
	const handleRemoveImageFile = (file, callback) => {
		setTotalSizeImageFile(totalSizeImageFile - file.size);
		callback();

		imageIdUploaded.current = null;
	};
	const handleRemoveVideoFile = (file, callback) => {
		setTotalSizeVideoFile(totalSizeVideoFile - file.size);
		callback();

		videoIdUploaded.current = null;
	};
	const handleClearImageFile = () => {
		setTotalSizeImageFile(0);
		imageIdUploaded.current = null;
	};
	const handleClearVideoFile = () => {
		setTotalSizeVideoFile(0);
		videoIdUploaded.current = null;
	};
	const handleValidationFailImageFile = () => {
		toastRef.current.show({
			severity: "error",
			summary: "Lỗi",
			detail: "Kích thước hình ảnh không hợp lệ",
			life: 3000,
		});
	};
	const handleValidationFailVideoFile = () => {
		toastRef.current.show({
			severity: "error",
			summary: "Lỗi",
			detail: "Kích thước video không hợp lệ",
			life: 3000,
		});
	};
	const handleBeforeShowDialog = () => {
		advertisementTypeApi.getAll().then((response) => {
			setAdvertisementTypes(
				response.data.map((advertisementType) => ({
					...advertisementType,
					id: +advertisementType.id,
					quantityAdvertisement: +advertisementType.quantityAdvertisement,
				}))
			);
		});
	};
	const handleCloseDialog = () => {
		imageIdUploaded.current = null;
		videoIdUploaded.current = null;

		titleRef.current.value = null;
		descriptionRef.current.value = null;
		durationRef.current.getInput().value = null;
		healthRewardRef.current.getInput().value = null;
		starRewardRef.current.getInput().value = null;
		diamondRewardRef.current.getInput().value = null;

		setTotalSizeImageFile(0);
		setTotalSizeVideoFile(0);
		setSelectedAdvertisementTypeId(null);
		setAdvertisementTypes([]);
		setOccurrenceRate(100);

		setVisible(false);
	};
	const handleSubmit = () => {
		const data = {
			title: titleRef.current?.value.trim(),
			description: descriptionRef.current?.value.trim(),
			duration: getInputNumberValue(durationRef.current.getInput().value),
			healthReward: getInputNumberValue(healthRewardRef.current.getInput().value),
			starReward: getInputNumberValue(starRewardRef.current.getInput().value),
			diamondReward: getInputNumberValue(diamondRewardRef.current.getInput().value),
			occurrenceRate,
			advertisementTypeId: selectedAdvertisementTypeId,
			imageId: imageIdUploaded.current,
			videoId: videoIdUploaded.current,
		};

		if (!data.title) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập tiêu đề quảng cáo (bắt buộc)",
				life: 3000,
			});
			return;
		}

		if (!data.advertisementTypeId) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa chọn loại quảng cáo (bắt buộc)",
				life: 3000,
			});
			return;
		}

		advertisementApi.add(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo quảng cáo thành công",
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
	const headerUploadImageFileTemplate = (options) => {
		const { className, chooseButton, uploadButton, cancelButton } = options;
		const value = totalSizeImageFile / 100000;
		const formatedValue =
			imageFileUploadRef && imageFileUploadRef.current ? imageFileUploadRef.current.formatSize(totalSizeImageFile) : "0 B";

		return (
			<div className={className} style={{ backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
				{chooseButton}
				{uploadButton}
				{cancelButton}
				<div className="flex align-items-center gap-3 ml-auto">
					<span>{formatedValue} / 10 MB</span>
					<ProgressBar value={value} showValue={false} style={{ width: "10rem", height: "12px" }}></ProgressBar>
				</div>
			</div>
		);
	};
	const headerUploadVideoFileTemplate = (options) => {
		const { className, chooseButton, uploadButton, cancelButton } = options;
		const value = totalSizeVideoFile / 100000;
		const formatedValue =
			videoFileUploadRef && videoFileUploadRef.current ? videoFileUploadRef.current.formatSize(totalSizeVideoFile) : "0 B";

		return (
			<div className={className} style={{ backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
				{chooseButton}
				{uploadButton}
				{cancelButton}
				<div className="flex align-items-center gap-3 ml-auto">
					<span>{formatedValue} / 10 MB</span>
					<ProgressBar value={value} showValue={false} style={{ width: "10rem", height: "12px" }}></ProgressBar>
				</div>
			</div>
		);
	};
	const itemUploadImageFileTemplate = (file, props) => {
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
						onClick={() => handleRemoveImageFile(file, props.onRemove)}
					/>
				</div>
			</div>
		);
	};
	const itemUploadVideoFileTemplate = (file, props) => {
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
						onClick={() => handleRemoveVideoFile(file, props.onRemove)}
					/>
				</div>
			</div>
		);
	};
	const emptyUploadImageFileTemplate = () => {
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
	const emptyUploadVideoFileTemplate = () => {
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
					Kéo thả video vào đây
				</span>
			</div>
		);
	};

	return (
		<>
			{createPortal(<Toast ref={toastRef} />, document.body)}
			<Dialog
				header="THÊM QUẢNG CÁO"
				visible={visible}
				style={{ width: "620px" }}
				onHide={handleCloseDialog}
				onShow={handleBeforeShowDialog}
			>
				<div className="mb-4">
					<span className="block mb-2">Tiêu đề <span className="text-red-500">*</span></span>
					<InputText ref={titleRef} className="w-full" placeholder="Nhập tiêu đề *" />
				</div>
				<div className="mb-4">
					<span className="block mb-2">Mô tả</span>
					<InputTextarea ref={descriptionRef} className="w-full" placeholder="Nhập mô tả" autoResize rows={5} />
				</div>
				<div className="mb-4">
					<span className="block mb-2">Thời gian quảng cáo (giây)</span>
					<InputNumber
						ref={durationRef}
						className="w-full"
						mode="decimal"
						placeholder="Nhập thời gian quảng cáo (giây)"
						showButtons
						min={0}
					/>
				</div>
				<div className="mb-4">
					<span className="block mb-2">
						Loại quảng cáo <span className="text-red-500">*</span>
					</span>
					<Dropdown
						value={selectedAdvertisementTypeId}
						onChange={(e) => setSelectedAdvertisementTypeId(e.value)}
						options={advertisementTypes}
						optionLabel="name"
						optionValue="id"
						placeholder="Chọn loại quảng cáo *"
						className="w-full"
					/>
				</div>
				<div className="mb-4">
					<span className="block mb-2">
						Tỉ lệ xuất hiện (<span className="text-pink-500">{occurrenceRate}%</span>)
					</span>
					<Slider value={occurrenceRate} onChange={(e) => setOccurrenceRate(e.value)} className="w-full" />
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
				<div className="mb-4">
					<span className="block mb-2">
						Hình ảnh
					</span>

					<Tooltip target=".custom-choose-btn" content="Chọn ảnh" position="bottom" />
					<Tooltip target=".custom-upload-btn" content="Tải ảnh lên máy chủ" position="bottom" />
					<Tooltip target=".custom-cancel-btn" content="Xóa" position="bottom" />

					<FileUpload
						ref={imageFileUploadRef}
						accept="image/*"
						invalidFileSizeMessageDetail="Kích thước hình ảnh vượt quá quy định"
						invalidFileSizeMessageSummary="Kích thước hình ảnh không hợp lệ"
						maxFileSize={10000000}
						onSelect={handleSelectImageFile}
						onClear={handleClearImageFile}
						onValidationFail={handleValidationFailImageFile}
						customUpload
						uploadHandler={handleUploadImageFile}
						headerTemplate={headerUploadImageFileTemplate}
						itemTemplate={itemUploadImageFileTemplate}
						emptyTemplate={emptyUploadImageFileTemplate}
						chooseOptions={chooseOptions}
						uploadOptions={uploadOptions}
						cancelOptions={cancelOptions}
					/>
				</div>
				<div className="mb-4">
					<span className="block mb-2">
						Video
					</span>

					<Tooltip target=".custom-choose-btn" content="Chọn video" position="bottom" />
					<Tooltip target=".custom-upload-btn" content="Tải video lên máy chủ" position="bottom" />
					<Tooltip target=".custom-cancel-btn" content="Xóa" position="bottom" />

					<FileUpload
						ref={videoFileUploadRef}
						accept="video/*"
						invalidFileSizeMessageDetail="Kích thước video vượt quá quy định"
						invalidFileSizeMessageSummary="Kích thước video không hợp lệ"
						maxFileSize={10000000}
						onSelect={handleSelectVideoFile}
						onClear={handleClearVideoFile}
						onValidationFail={handleValidationFailVideoFile}
						customUpload
						uploadHandler={handleUploadVideoFile}
						headerTemplate={headerUploadVideoFileTemplate}
						itemTemplate={itemUploadVideoFileTemplate}
						emptyTemplate={emptyUploadVideoFileTemplate}
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
