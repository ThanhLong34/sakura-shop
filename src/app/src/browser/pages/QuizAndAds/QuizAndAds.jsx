import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./QuizAndAds.module.scss";
import { Button } from "primereact/button";
import QuizIcon from "@/assets/images/dockIcons/Quiz.png";
import AdsIcon from "@/assets/images/dockIcons/Ads.png";
import { useState } from "react";
import QuizDialog from "./QuizDialog";
import AdsDialog from "./AdsDialog";

const cx = classNames.bind(styles);

function QuizAndAds() {
	const [quizDialogVisible, setQuizDialogVisible] = useState(false);
	const [adsDialogVisible, setAdsDialogVisible] = useState(false);

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
							<div className={cx("item-action")}>
								<Button
									className="w-full"
									label="Trả lời câu hỏi"
									severity="primary"
									onClick={() => setQuizDialogVisible(true)}
								/>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className={cx("item")}>
							<img className={cx("item-image")} src={AdsIcon} alt="ads" />
							<p className={cx("item-title")}>Xem quảng cáo để nhận sức khỏe, sao và kim cương</p>
							<div className={cx("item-action")}>
								<Button
									className="w-full"
									label="Xem quảng cáo"
									severity="primary"
									onClick={() => setAdsDialogVisible(true)}
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
