import { useState, memo, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AdsDialog.module.scss";
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
import { arrayShuffledByProbability } from "@/helpers/chatgpt";

const cx = classNames.bind(styles);

AdsDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
};

function AdsDialog({ visible, setVisible }) {
	const dispatch = useDispatch();
	const playerAccount = useSelector((state) => state.player.account);

	//? Refs
	const toastRef = useRef(null);

	//? States

	//? Effects
	useLayoutEffect(() => {
		advertisementApi.getAll().then((response) => {
			if (response.code === 1) {
				const adsList = response.data.map((question) => ({
					...question,
					id: +question.id,
					duration: +question.duration,
					healthReward: +question.healthReward,
					starReward: +question.starReward,
					diamondReward: +question.diamondReward,
					occurrenceRate: +question.occurrenceRate,
					advertisementTypeId: +question.advertisementTypeId,
				}));

				const adsListShuffled = getAdsListShuffled(adsList);
				console.log(adsListShuffled);
			}
		});
	}, [visible]);

	//? Functions
	const getAdsListShuffled = (adsList) => {
		return arrayShuffledByProbability(adsList, "occurrenceRate");
	};

	//? Handles
	const handleCloseDialog = () => {
		setVisible(false);
	};
	const handleSubmit = () => {};

	return (
		<>
			{createPortal(<Toast ref={toastRef} position="top-right" />, document.body)}
			<Dialog
				header="XEM QUẢNG CÁO"
				visible={visible}
				style={{ width: "850px" }}
				onHide={handleCloseDialog}
				closable={false}
			>
				<div>
					<div>
						<div>VIDEO</div>
					</div>
					<div className={cx("mt-4")}>
						<h4 className={cx("heading")}>Xem xong quảng cáo này bạn sẽ nhận được:</h4>
						<div className={cx("rewards")}>
							{/* {questionRandom.healthReward > 0 && (
									<div className={cx("reward-data", "flex")}>
										<img className={cx("reward-icon")} src={HealthIcon} alt="health icon" />
										<span className={cx("reward-value")}>{questionRandom.healthReward}</span>
									</div>
								)}
								{questionRandom.starReward > 0 && (
									<div className={cx("reward-data", "flex")}>
										<img className={cx("reward-icon")} src={StarIcon} alt="star icon" />
										<span className={cx("reward-value")}>{questionRandom.starReward}</span>
									</div>
								)}
								{questionRandom.diamondReward > 0 && (
									<div className={cx("reward-data", "flex")}>
										<img className={cx("reward-icon")} src={DiamondIcon} alt="diamond icon" />
										<span className={cx("reward-value")}>{questionRandom.diamondReward}</span>
									</div>
								)} */}
						</div>
					</div>
				</div>
				<div className="flex align-items-center justify-content-end mt-4">
					<Button className="mr-3" label="Đóng" severity="danger" outlined onClick={handleCloseDialog} />
					<Button label={"Xem tiếp"} severity="primary" />
				</div>
			</Dialog>
		</>
	);
}

export default memo(AdsDialog);
