import { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AnswerManagementDialog.module.scss";

import questionApi from "@/apis/questionApi";
import answerApi from "@/apis/answerApi";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";

const cx = classNames.bind(styles);

AnswerManagementDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	item: PropTypes.object,
	onSubmitted: PropTypes.func,
};

AnswerManagementDialog.defaultProps = {
	item: {},
	onSubmitted: () => {},
};

function AnswerManagementDialog({ visible, setVisible, item, onSubmitted }) {
	//? Refs
	const toastRef = useRef(null);
	const rightAnswerContentRef = useRef(null);
	const wrongAnswerContentRef = useRef(null);

	//? Handles
	const handleCloseDialog = () => {
		setVisible(false);
	};

	return (
		<>
			<Toast ref={toastRef} />
			<Dialog header="QUẢN LÝ CÂU TRẢ LỜI" visible={visible} style={{ width: "620px" }} onHide={handleCloseDialog}>
				<div className="mb-4">
					<span className="block mb-2">
						Câu trả lời đúng
					</span>
					<InputTextarea
						ref={contentRef}
						className="w-full"
						placeholder="Nhập nội dung câu trả lời đúng"
						autoResize
						rows={5}
					/>
				</div>
				<div className="mb-4">
					<span className="block mb-2">
						Câu trả lời sai
					</span>
					<InputTextarea
						ref={contentRef}
						className="w-full"
						placeholder="Nhập nội dung câu trả lời sai"
						autoResize
						rows={5}
					/>
				</div>
				<div className="flex justify-content-end pt-2">
					<Button label="Thoát" severity="info" outlined onClick={handleCloseDialog} />
				</div>
			</Dialog>
		</>
	);
}

export default AnswerManagementDialog;
