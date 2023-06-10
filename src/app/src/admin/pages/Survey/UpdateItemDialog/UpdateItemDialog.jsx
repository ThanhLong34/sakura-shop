import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { createImageFileFromUrl } from "@/helpers/converter";

import surveyApi from "@/apis/surveyApi";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";

UpdateItemDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	item: PropTypes.object,
	onSubmitted: PropTypes.func,
};

UpdateItemDialog.defaultProps = {
	item: {},
	onSubmitted: () => {},
};

function UpdateItemDialog({ visible, setVisible, item, onSubmitted }) {
	//? Refs
	const toastRef = useRef(null);
	const titleRef = useRef(null);
	const formLinkRef = useRef(null);
	const spreadsheetLinkRef = useRef(null);
	const getListPhoneNumberApiRef = useRef(null);

	//? Handles
	const handleBindingData = () => {
		if (item) {
			titleRef.current.value = item.title;
			formLinkRef.current.value = item.formLink;
			spreadsheetLinkRef.current.value = item.spreadsheetLink;
			getListPhoneNumberApiRef.current.value = item.getListPhoneNumberApi;
		}
	};
	const handleCloseDialog = () => {
		titleRef.current.value = null;
		formLinkRef.current.value = null;
		spreadsheetLinkRef.current.value = null;
		getListPhoneNumberApiRef.current.value = null;

		setVisible(false);
	};
	const handleSubmit = () => {
		const title = titleRef.current?.value.trim();
		const formLink = formLinkRef.current?.value.trim();
		const spreadsheetLink = spreadsheetLinkRef.current?.value.trim();
		const getListPhoneNumberApi = getListPhoneNumberApiRef.current?.value.trim();

		if (!title) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập tiêu đề khảo sát (bắt buộc)",
				life: 3000,
			});
			return;
		}

		const data = {
			id: item.id,
			title: title !== item.title ? title : null,
			formLink: formLink !== item.formLink ? formLink : null,
			spreadsheetLink: spreadsheetLink !== item.spreadsheetLink ? spreadsheetLink : null,
			getListPhoneNumberApi: getListPhoneNumberApi !== item.getListPhoneNumberApi ? getListPhoneNumberApi : null,
		};

		surveyApi.update(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Cập nhật khảo sát thành công",
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
				header="THAY ĐỔI KHẢO SÁT"
				visible={visible}
				onShow={handleBindingData}
				style={{ width: "620px" }}
				onHide={handleCloseDialog}
			>
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
				<div className="flex justify-content-end pt-2">
					<Button className="mr-3" label="Xác nhận" severity="info" onClick={handleSubmit} />
					<Button label="Hủy" severity="info" outlined onClick={handleCloseDialog} />
				</div>
			</Dialog>
		</>
	);
}

export default UpdateItemDialog;
