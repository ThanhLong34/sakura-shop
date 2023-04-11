import { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AddItemDialog.module.scss";
import { getInputNumberValue } from "@/helpers/converter";
import topicApi from "@/apis/topicApi";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";

const cx = classNames.bind(styles);

AddItemDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
};

// setVisible là 1 SetStateAction
// visible & item là các State
// Nên không cần dùng memo, useCallback, useMemo

function AddItemDialog({ visible, setVisible, onSubmitted }) {
	//? Refs
	const toastRef = useRef(null);
	const levelRef = useRef(null);
	const experienceRef = useRef(null);
	const healthRef = useRef(null);
	const starRef = useRef(null);
	const diamondRef = useRef(null);
	const fileUploadRef = useRef(null);

	//? States
	const [totalSize, setTotalSize] = useState(0);

	//? Handles
	const handleCloseDialog = () => {
		setVisible(false);
	};
	const handleSubmit = () => {
		return;

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

		topicApi.add(data).then((response) => {
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

	//? Templates
	const handleSelectFile = (e) => {
		let _totalSize = totalSize;
		let files = e.files;

		Object.keys(files).forEach((key) => {
			_totalSize += files[key].size || 0;
		});

		setTotalSize(_totalSize);
	};

	const handleUploadFile = (e) => {
		let _totalSize = 0;

		e.files.forEach((file) => {
			_totalSize += file.size || 0;
		});

		setTotalSize(_totalSize);
		toastRef.current.show({ severity: "success", summary: "Thành công", detail: "Tải ảnh lên máy chủ thành công" });
	};

	const handleRemoveFile = (file, callback) => {
		setTotalSize(totalSize - file.size);
		callback();
	};

	const handleClearFile = () => {
		setTotalSize(0);
	};

	const handleErrorFile = (e) => {
		console.log(e);
	};

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
			<div className="flex align-items-center flex-wrap">
				<div className="flex align-items-center" style={{ width: "40%" }}>
					<img className="" alt={file.name} role="presentation" src={file.objectURL} width={100} />
					<span className="flex flex-column text-left ml-3">
						{file.name}
						<small>{new Date().toLocaleDateString()}</small>
					</span>
				</div>
				<Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
				<Button
					type="button"
					icon="pi pi-times"
					className="p-button-outlined p-button-rounded p-button-danger ml-auto"
					onClick={() => handleRemoveFile(file, props.onRemove)}
				/>
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

	return (
		<>
			<Toast ref={toastRef} />
			<Dialog header="THÊM CHỦ ĐỀ" visible={visible} style={{ width: "500px" }} onHide={handleCloseDialog}>
				<div className="mb-4">
					<span className="block mb-2">Tên chủ đề *</span>
					<InputText ref={levelRef} className="w-full" placeholder="Nhập tên chủ đề *" />
				</div>
				<div className="mb-4">
					<span className="block mb-2">Hình ảnh *</span>

					<Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
					<Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
					<Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

					<FileUpload
						ref={fileUploadRef}
						name="image"
						url="/api/upload"
						multiple
						accept="image/*"
						maxFileSize={2000000}
						onUpload={handleUploadFile}
						onSelect={handleSelectFile}
						onError={handleErrorFile}
						onClear={handleClearFile}
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
