import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import answerApi from "@/apis/answerApi";

import Answer from "@/admin/components/Answer/Answer";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";

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

	//? States
	const [rightAnswers, setRightAnswers] = useState([]);
	const [wrongAnswers, setWrongAnswers] = useState([]);

	//? Handles
	const handleRemoveAnswer = (answerId) => {
		if (answerId) {
			answerApi.trashById(answerId).then((response) => {
				if (response.code === 1) {
					toastRef.current.show({
						severity: "success",
						summary: "Thành Công",
						detail: "Xóa câu trả lời thành công",
						life: 3000,
					});

					handleReload();
				} else {
					toastRef.current.show({
						severity: "error",
						summary: "Lỗi",
						detail: response.message,
						life: 3000,
					});
				}
			});
		}
	};
	const handleOpenRemoveAnswerPopup = (e, answerId) => {
		confirmPopup({
			target: e.currentTarget,
			message: "Bạn có chắn chắc muốn xóa?",
			icon: "pi pi-info-circle",
			acceptClassName: "p-button-danger",
			acceptLabel: "Có",
			rejectLabel: "Không",
			accept: () => handleRemoveAnswer(answerId),
		});
	};
	const handleAddRightAnswer = () => {
		const data = {
			content: rightAnswerContentRef.current?.value.trim(),
			isRight: true,
			questionId: item.id,
		};

		if (!data.content) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập nội dung câu trả lời đúng (bắt buộc)",
				life: 3000,
			});
			return;
		}

		answerApi.add(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo câu trả lời đúng thành công",
					life: 3000,
				});

				rightAnswerContentRef.current.value = null;
				handleReload();
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
	const handleAddWrongAnswer = () => {
		const data = {
			content: wrongAnswerContentRef.current?.value.trim(),
			isRight: false,
			questionId: item.id,
		};

		if (!data.content) {
			toastRef.current.show({
				severity: "warn",
				summary: "Cảnh báo",
				detail: "Bạn chưa nhập nội dung câu trả lời sai (bắt buộc)",
				life: 3000,
			});
			return;
		}

		answerApi.add(data).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành Công",
					detail: "Tạo câu trả lời sai thành công",
					life: 3000,
				});

				wrongAnswerContentRef.current.value = null;
				handleReload();
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
	const handleReload = () => {
		handleBeforeShowDialog();
	};
	const handleBeforeShowDialog = () => {
		(async () => {
			if (item) {
				const getAnswersResponse = await answerApi.getByQuestionId(item.id);

				if (getAnswersResponse.code === 1) {
					setRightAnswers(
						getAnswersResponse.data
							.filter((answer) => +answer.isRight === 1)
							.map((answer) => ({
								...answer,
								id: +answer.id,
								isRight: +answer.isRight === 1,
								questionId: +answer.questionId,
							}))
					);
					setWrongAnswers(
						getAnswersResponse.data
							.filter((answer) => +answer.isRight === 0)
							.map((answer) => ({
								...answer,
								id: +answer.id,
								isRight: +answer.isRight === 1,
								questionId: +answer.questionId,
							}))
					);
				} else {
					toastRef.current.show({
						severity: "error",
						summary: "Lỗi",
						detail: getAnswersResponse.message,
						life: 3000,
					});
				}
			}
		})();
	};
	const handleCloseDialog = () => {
		rightAnswerContentRef.current.value = null;
		wrongAnswerContentRef.current.value = null;
		
		setVisible(false);
	};

	return (
		<>
			{createPortal(<Toast ref={toastRef} />, document.body)}
			<ConfirmPopup />
			<Dialog
				header="QUẢN LÝ CÂU TRẢ LỜI"
				visible={visible}
				style={{ width: "1000px" }}
				onHide={handleCloseDialog}
				onShow={handleBeforeShowDialog}
			>
				<div className="mb-4">
					<span className="block mb-2">Câu trả lời đúng (chỉ nên có 1 câu trả lời đúng)</span>
					{rightAnswers &&
						rightAnswers.map((answer) => (
							<Answer
								key={answer.id}
								id={answer.id}
								type="right"
								content={answer.content}
								onRemove={handleOpenRemoveAnswerPopup}
							/>
						))}
					<InputTextarea
						ref={rightAnswerContentRef}
						className="w-full"
						placeholder="Nhập nội dung câu trả lời đúng *"
						autoResize
						rows={5}
					/>
					<Button
						className="mt-3"
						label="Thêm câu trả lời đúng"
						severity="success"
						onClick={handleAddRightAnswer}
					/>
				</div>
				<Divider type="solid" />
				<div className="mb-4">
					<span className="block mb-2">Câu trả lời sai</span>
					{wrongAnswers &&
						wrongAnswers.map((answer) => (
							<Answer
								key={answer.id}
								id={answer.id}
								type="wrong"
								content={answer.content}
								onRemove={handleOpenRemoveAnswerPopup}
							/>
						))}
					<InputTextarea
						ref={wrongAnswerContentRef}
						className="w-full"
						placeholder="Nhập nội dung câu trả lời sai *"
						autoResize
						rows={5}
					/>
					<Button className="mt-3" label="Thêm câu trả lời sai" severity="danger" onClick={handleAddWrongAnswer} />
				</div>
				<div className="flex justify-content-end pt-2">
					<Button label="Đóng" severity="info" outlined onClick={handleCloseDialog} />
				</div>
			</Dialog>
		</>
	);
}

export default AnswerManagementDialog;
