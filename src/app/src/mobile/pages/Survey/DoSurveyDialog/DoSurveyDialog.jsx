import { useState, memo, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DoSurveyDialog.module.scss";
import { updatePlayerAccountGameData } from "@/store/playerSlice";

import surveyApi from "@/apis/surveyApi";

import { confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import playerApi from "@/apis/playerApi";

const cx = classNames.bind(styles);

DoSurveyDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	survey: PropTypes.object,
	onDoSurveySuccess: PropTypes.func,
};

DoSurveyDialog.defaultProps = {
	survey: {},
	onDoSurveySuccess: () => {},
};

function DoSurveyDialog({ visible, setVisible, survey, onDoSurveySuccess }) {
	const dispatch = useDispatch();
	const playerAccount = useSelector((state) => state.player.account);

	//? Refs
	const toastRef = useRef(null);
	const loadingRef = useRef(null);

	//? States
	const [isCheckingSurvey, setIsCheckingSurvey] = useState(false);

	//? Handles
	const handleOpenDialog = () => {
		loadingRef.current.innerText = "Đang tải khảo sát...";
	};
	const handleCloseDialog = () => {
		setVisible(false);
	};
	const handleConfirm = () => {
		setIsCheckingSurvey(true);
		surveyApi.getPhoneNumbersByApi(survey.getListPhoneNumberApi).then((res) => {
			const isParticipanted = res.data.includes(playerAccount.phoneNumber);
			if (isParticipanted) {
				const gameData = {
					health: survey.healthReward
						? parseInt(playerAccount.health) + parseInt(survey.healthReward)
						: null,
					star: survey.starReward
						? parseInt(playerAccount.star) + parseInt(survey.starReward)
						: null,
					diamond: survey.diamondReward
						? parseInt(playerAccount.diamond) + parseInt(survey.diamondReward)
						: null,
				};

				playerApi
					.updateGameData({
						...gameData,
						id: +playerAccount.id,
					})
					.then((response) => {
						if (response.code === 1) {
							toastRef.current.show({
								severity: "success",
								summary: "Thành công",
								detail: "Đã nhận thưởng",
								life: 3000,
							});

							const action = updatePlayerAccountGameData(gameData);
							dispatch(action);
							setVisible(false);
							onDoSurveySuccess(survey);
						}
					});
			} else {
				confirmDialog({
					message: "Bạn chưa hoàn thành khảo sát, hãy nhấn nút Gửi ở cuối phần khảo sát",
					header: "XÁC NHẬN THẤT BẠI",
					icon: "pi pi-times",
					rejectLabel: "Đóng",
					acceptLabel: "Đã hiểu",
					acceptClassName: "p-button-danger",
					closable: false,
				});
			}
			setIsCheckingSurvey(false);
		});
	};
	const handleSurveyFrameLoaded = () => {
		loadingRef.current.innerText = "";
	};

	return (
		<>
			{createPortal(<Toast ref={toastRef} position="top-right" />, document.body)}
			<Dialog
				header="THỰC HIỆN KHẢO SÁT"
				visible={visible}
				style={{ width: "700px" }}
				onHide={handleCloseDialog}
				onShow={handleOpenDialog}
				closable={false}
			>
				<p ref={loadingRef}></p>
				<div className={cx("survey-frame")}>
					<iframe
						src={survey.iframeSource}
						frameBorder="0"
						marginHeight="0"
						marginWidth="0"
						onLoad={handleSurveyFrameLoaded}
					/>
				</div>
				<div className="flex align-items-center justify-content-end mt-4">
					<Button className="mr-3" label="Đóng" severity="danger" outlined onClick={handleCloseDialog} />
					<Button
						label={isCheckingSurvey ? "Đang xử lý..." : "Xác nhận hoàn thành"}
						severity="info"
						loading={isCheckingSurvey}
						onClick={handleConfirm}
					/>
				</div>
			</Dialog>
		</>
	);
}

export default memo(DoSurveyDialog);
