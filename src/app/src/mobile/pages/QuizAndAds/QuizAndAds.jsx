import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./QuizAndAds.module.scss";
import QuizIcon from "@/assets/images/dockIcons/Quiz.png";
import AdsIcon from "@/assets/images/dockIcons/Ads.png";
import QuizDialog from "./QuizDialog";
import AdsDialog from "./AdsDialog";
import { Button } from "primereact/button";

const cx = classNames.bind(styles);

function QuizAndAds() {
	const [quizDialogVisible, setQuizDialogVisible] = useState(false);
	const [adsDialogVisible, setAdsDialogVisible] = useState(false);

	return (
		<>
			<QuizDialog visible={quizDialogVisible} setVisible={setQuizDialogVisible} />
			<AdsDialog visible={adsDialogVisible} setVisible={setAdsDialogVisible} />
			<div className={cx("wrapper")}>
				<div className="card">
					<h5 className={cx("heading1")}>THU THẬP SỨC KHỎE</h5>
					<h6 className={cx("heading2", "mt-3")}>
						<span>Trả lời câu hỏi trắc nghiệm</span> hoặc <span>Xem quảng cáo</span>
						<br />
						Để thu thập sức khỏe, sao và kim cương bạn nhé!
					</h6>
					<div className="grid mt-3">
						<div className="col-12">
							<div className={cx("item")}>
								<img className={cx("item-image")} src={QuizIcon} alt="quiz" />
								<p className={cx("item-title")}>
									Trả lời câu hỏi trắc nghiệm để nhận sức khỏe, sao và kim cương
								</p>
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
						<div className="col-12">
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
			</div>
		</>
	);
}

export default QuizAndAds;
