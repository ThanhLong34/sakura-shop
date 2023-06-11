import { useState, memo, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DoSurveyDialog.module.scss";
import { updatePlayerAccountGameData } from "@/store/playerSlice";

import advertisementApi from "@/apis/advertisementApi";
import playerApi from "@/apis/playerApi";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

//Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import { Toast } from "primereact/toast";

const cx = classNames.bind(styles);

DoSurveyDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	survey: PropTypes.object,
};

DoSurveyDialog.defaultProps = {
	survey: {},
};

function DoSurveyDialog({ visible, setVisible, survey }) {
	const dispatch = useDispatch();
	const playerAccount = useSelector((state) => state.player.account);

	//? Refs
	const toastRef = useRef(null);
	const loadingRef = useRef(null);

	//? States

	//? Effects

	//? Functions

	//? Handles
	const handleOpenDialog = () => {
		loadingRef.current.innerText = "Đang tải khảo sát...";
	};
	const handleCloseDialog = () => {
		setVisible(false);
	};
	const handleConfirm = () => {
		setVisible(false);
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
						src="https://docs.google.com/forms/d/e/1FAIpQLSe7hW8f54Afn4WTgOzPZp3ZVPIhjaIR42jGVIupn4ZNX5hXoQ/viewform?embedded=true"
						frameBorder="0"
						marginHeight="0"
						marginWidth="0"
						onLoad={handleSurveyFrameLoaded}
					/>
				</div>
				<div className="flex align-items-center justify-content-end mt-4">
					<Button className="mr-3" label="Đóng" severity="danger" outlined onClick={handleCloseDialog} />
					<Button label="Xác nhận hoàn thành" severity="info" onClick={handleConfirm} />
				</div>
			</Dialog>
		</>
	);
}

export default memo(DoSurveyDialog);
