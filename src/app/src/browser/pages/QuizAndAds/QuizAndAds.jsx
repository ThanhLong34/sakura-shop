import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./QuizAndAds.module.scss";
import { Button } from "primereact/button";
import QuizIcon from "@/assets/images/dockIcons/Quiz.png";
import AdsIcon from "@/assets/images/dockIcons/Ads.png";
import { useState } from "react";
import QuizDialog from "./QuizDialog";
import AdsDialog from "./AdsDialog";
import { updatePlayerAccountGameData } from "@/store/playerSlice";
import limitedNumbersApi from "@/apis/limitedNumbersApi";

const cx = classNames.bind(styles);

function QuizAndAds() {
	const dispatch = useDispatch();
	const playerAccount = useSelector((state) => state.player.account);
	const [quizDialogVisible, setQuizDialogVisible] = useState(false);
	const [adsDialogVisible, setAdsDialogVisible] = useState(false);

	const handleOpenQuizDialog = () => {
		if (playerAccount.remainingQuestions <= 0) return;

		limitedNumbersApi.substractRemainingQuestions(playerAccount.id).then((res) => {
			if (res.code === 1) {
				const gameData = { remainingQuestions: playerAccount.remainingQuestions - 1 };
				const action = updatePlayerAccountGameData(gameData);
				dispatch(action);

				setQuizDialogVisible(true);
			}
		});
	};
	const handleOpenAdsDialog = () => {
		if (playerAccount.remainingAdvertisements <= 0) return;

		limitedNumbersApi.substractRemainingAdvertisements(playerAccount.id).then((res) => {
			if (res.code === 1) {
				const gameData = { remainingAdvertisements: playerAccount.remainingAdvertisements - 1 };
				const action = updatePlayerAccountGameData(gameData);
				dispatch(action);

				setAdsDialogVisible(true);
			}
		});
	};

	return (
		<>
			<QuizDialog visible={quizDialogVisible} setVisible={setQuizDialogVisible} />
			<AdsDialog visible={adsDialogVisible} setVisible={setAdsDialogVisible} />
			<div className={cx("card", "wrapper")}>
				<h5 className={cx("heading1")}>Thu thập sức khỏe</h5>
				<h6 className={cx("heading2", "mt-4")}>
					<span>Trả lời câu hỏi trắc nghiệm</span> hoặc <span>Xem quảng cáo</span>
					<br />
					Để thu thập sức khỏe, sao và kim cương bạn nhé!
				</h6>
				<div className="grid mt-4">
					<div className="col-6">
						<div className={cx("item")}>
							<img className={cx("item-image")} src={QuizIcon} alt="quiz" />
							<p className={cx("item-title")}>Trả lời câu hỏi trắc nghiệm để nhận sức khỏe, sao và kim cương</p>
							<p className={cx("item-subtitle")}>
								Bạn còn {playerAccount.remainingQuestions <= 0 ? 0 : playerAccount.remainingQuestions} lượt trả
								lời câu hỏi
								<br />
								{playerAccount.remainingQuestions <= 0 && <span>Hãy quay lại vào ngày mai bạn nhé!</span>}
							</p>
							<div className={cx("item-action")}>
								<Button
									className="w-full"
									label="Trả lời câu hỏi"
									severity="primary"
									disabled={playerAccount.remainingQuestions <= 0}
									onClick={handleOpenQuizDialog}
								/>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className={cx("item")}>
							<img className={cx("item-image")} src={AdsIcon} alt="ads" />
							<p className={cx("item-title")}>Xem quảng cáo để nhận sức khỏe, sao và kim cương</p>
							<p className={cx("item-subtitle")}>
								Bạn còn {playerAccount.remainingAdvertisements} lượt xem quảng cáo
								<br />
								{playerAccount.remainingAdvertisements <= 0 && <span>Hãy quay lại vào ngày mai bạn nhé!</span>}
							</p>
							<div className={cx("item-action")}>
								<Button
									className="w-full"
									label="Xem quảng cáo"
									severity="primary"
									disabled={playerAccount.remainingAdvertisements <= 0}
									onClick={handleOpenAdsDialog}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default QuizAndAds;
