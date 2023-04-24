import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import topicApi from "@/apis/topicApi";
import imageFileApi from "@/apis/imageFileApi";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";

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

	//? Refs
	const toastRef = useRef(null);
	const fileUploadRef = useRef(null);
	const nameRef = useRef(null);

	//? States
	const [totalSize, setTotalSize] = useState(0);

	//? Handles
	const handleSelectFile = (e) => {
		let _totalSize = 0;
		let files = e.files;

		Object.keys(files).forEach((key) => {
			_totalSize += files[key].size || 0;
		});

		setTotalSize(_totalSize);
		imageIdUploaded.current = null;
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
		imageIdUploaded.current = null;
		
		nameRef.current.value = null;

		setTotalSize(0);

		setVisible(false);
	};
	const handleSubmit = () => {
		const data = {
			name: nameRef.current?.value.trim(),
			imageId: imageIdUploaded.current,
		};

		if (!data.name) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập tên chủ đề (bắt buộc)",
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

		topicApi.add(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo chủ đề thành công",
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
		const value = totalSize / 20000;
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
			{createPortal(<Toast ref={toastRef} />, document.body)}
			<Dialog header="THÊM CHỦ ĐỀ" visible={visible} style={{ width: "620px" }} onHide={handleCloseDialog}>
				<div className="mb-4">
					<span className="block mb-2">
						Tên chủ đề <span className="text-red-500">*</span>
					</span>
					<InputText ref={nameRef} className="w-full" placeholder="Nhập tên chủ đề *" />
				</div>
				<div className="mb-4">
					<span className="block mb-2">
						Hình ảnh <span className="text-red-500">*</span>
					</span>

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
