import { useState, memo, useLayoutEffect, useRef, useEffect } from "react";
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
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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
	const timer = useRef(null);

	//? States
	const [adsList, setAdsList] = useState([]);
	const [currentAds, setCurrentAds] = useState(null);
	const [currentAdsIndex, setCurrentAdsIndex] = useState(0);

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
				if (adsListShuffled) {
					setCurrentAds(adsListShuffled[currentAdsIndex]);
					setAdsList(adsListShuffled);
				}
			}
		});
	}, []);

	//? Functions
	const getAdsListShuffled = (adsList) => {
		return arrayShuffledByProbability(adsList, "occurrenceRate");
	};
	const nextAds = () => {
		if (adsList[currentAdsIndex + 1]) {
			setCurrentAds(adsList[currentAdsIndex + 1]);
			setCurrentAdsIndex((prevState) => prevState + 1);
		} else {
			setCurrentAds(adsList[0]);
			setCurrentAdsIndex(0);
		}
	};

	//? Handles
	const handleCloseDialog = () => {
		nextAds();

		clearTimeout(timer.current);
		timer.current = null;

		setVisible(false);
	};
	const handleOpenDialog = () => {
		if (currentAds) {
			timer.current = setTimeout(() => {
				const gameData = {
					health: currentAds.healthReward
						? parseInt(playerAccount.health) + parseInt(currentAds.healthReward)
						: null,
					star: currentAds.starReward ? parseInt(playerAccount.star) + parseInt(currentAds.starReward) : null,
					diamond: currentAds.diamondReward
						? parseInt(playerAccount.diamond) + parseInt(currentAds.diamondReward)
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
						}
					});
			}, (currentAds.duration + 1) * 1000);
		}
	};

	//? Templates
	const adsRender = () => {
		if (currentAds) {
			if (currentAds.videoUrl) {
				return (
					<video
						className={cx("ads-video")}
						src={currentAds.videoUrl}
						type="video/mp4"
						width="100%"
						height="100%"
						autoPlay
						muted
					/>
				);
			} else if (currentAds.imageUrl) {
				return <img className={cx("ads-image")} src={currentAds.imageUrl} width="100%" height="100%" />;
			}
		}
	};

	return (
		<>
			{createPortal(<Toast ref={toastRef} position="top-right" />, document.body)}
			<Dialog
				header="XEM QUẢNG CÁO"
				visible={visible}
				style={{ width: "680px" }}
				onHide={handleCloseDialog}
				onShow={handleOpenDialog}
				closable={false}
			>
				{currentAds && (
					<div>
						<div className={cx("ads-wrapper")}>
							<span className={cx("ads-duration")}>
								<CountdownCircleTimer
									isPlaying
									duration={currentAds.duration}
									colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
									colorsTime={[7, 5, 2, 0]}
									size={40}
									strokeWidth={5}
								>
									{({ remainingTime }) => remainingTime}
								</CountdownCircleTimer>
							</span>
							{adsRender()}
						</div>
						<div className={cx("mt-4")}>
							<h4 className={cx("heading")}>Xem xong quảng cáo này bạn sẽ nhận được:</h4>
							<div className={cx("rewards")}>
								{currentAds.healthReward > 0 && (
									<div className={cx("reward-data", "flex")}>
										<img className={cx("reward-icon")} src={HealthIcon} alt="health icon" />
										<span className={cx("reward-value")}>{currentAds.healthReward}</span>
									</div>
								)}
								{currentAds.starReward > 0 && (
									<div className={cx("reward-data", "flex")}>
										<img className={cx("reward-icon")} src={StarIcon} alt="star icon" />
										<span className={cx("reward-value")}>{currentAds.starReward}</span>
									</div>
								)}
								{currentAds.diamondReward > 0 && (
									<div className={cx("reward-data", "flex")}>
										<img className={cx("reward-icon")} src={DiamondIcon} alt="diamond icon" />
										<span className={cx("reward-value")}>{currentAds.diamondReward}</span>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				<div className="flex align-items-center justify-content-end mt-4">
					<Button className="mr-3" label="Đóng" severity="danger" outlined onClick={handleCloseDialog} />
				</div>
			</Dialog>
		</>
	);
}

export default memo(AdsDialog);
