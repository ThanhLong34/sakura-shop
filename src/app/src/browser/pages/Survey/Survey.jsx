import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Survey.module.scss";

import surveyApi from "@/apis/surveyApi";

//Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import SurveyIcon from "@/assets/images/dockIcons/Survey.png";

import { Button } from "primereact/button";
import DoSurveyDialog from "./DoSurveyDialog/DoSurveyDialog";

const cx = classNames.bind(styles);

function Survey() {
	const playerAccount = useSelector((state) => state.player.account);
	const [doSurveyDialogVisible, setDoSurveyDialogVisible] = useState(false);
	const [surveySelected, setSurveySelected] = useState({});
	const [surveys, setSurveys] = useState([]);

	useEffect(() => {
		surveyApi.getAll().then((response) => {
			if (response.code === 1) {
				const surveyPromies = response.data.map((survey) => {
					return getListPhoneNumberPromise(survey.getListPhoneNumberApi).then((res) => {
						survey.id = +survey.id;
						survey.healthReward = +survey.healthReward;
						survey.starReward = +survey.starReward;
						survey.diamondReward = +survey.diamondReward;
						survey.isParticipanted = res.data.includes(playerAccount.phoneNumber);

						return survey;
					});
				});

				Promise.all(surveyPromies).then((res) => {
					setSurveys(res);
				});
			}
		});
	}, []);

	const getListPhoneNumberPromise = (getListPhoneNumberApi) => {
		return new Promise((resolve, reject) => {
			surveyApi.getPhoneNumbersByApi(getListPhoneNumberApi).then((res) => {
				if (res.isSuccess == "true") resolve(res);
				reject(res);
			});
		});
	};
	const handleOpenSurveyDialog = (survey) => {
		setSurveySelected(survey);
		setDoSurveyDialogVisible(true);
	};
	const handleDoDurveySuccess = useCallback((survey) => {
		setSurveys((prevState) =>
			prevState.map((i) => {
				if (i.id === survey.id) {
					return {
						...i,
						isParticipanted: true,
					};
				}

				return i;
			})
		);
	}, []);

	return (
		<>
			<DoSurveyDialog
				visible={doSurveyDialogVisible}
				setVisible={setDoSurveyDialogVisible}
				survey={surveySelected}
				onDoSurveySuccess={handleDoDurveySuccess}
			/>
			<div className={cx("card", "wrapper")}>
				<h5 className={cx("heading1")}>Danh sách khảo sát</h5>
				<h6 className={cx("heading2", "mt-2")}>
					<span>Tham gia khảo sát để nhận về các phần thưởng hấp dẫn bạn nhé!</span>
				</h6>
				{surveys && surveys.length > 0 ? (
					<div className={cx("survey-list", "grid mt-5")}>
						{surveys.map((survey) => (
							<div className={cx("survey-item", "col-6 md:col-6 mb-4")} key={survey.id}>
								<div className={cx("survey-icon-wrapper")}>
									<img className={cx("survey-icon")} src={SurveyIcon} alt="survey" />
								</div>
								<div className={cx("survey-info")}>
									<div>
										<h6 className={cx("survey-title")}>{survey.title}</h6>
										<div className={cx("mt-3")}>
											<h4 className={cx("reward-heading")}>Phần thưởng:</h4>
											<div className={cx("rewards")}>
												{survey.healthReward > 0 && (
													<div className={cx("reward-data", "flex")}>
														<img className={cx("reward-icon")} src={HealthIcon} alt="health icon" />
														<span className={cx("reward-value")}>{survey.healthReward}</span>
													</div>
												)}
												{survey.starReward > 0 && (
													<div className={cx("reward-data", "flex")}>
														<img className={cx("reward-icon")} src={StarIcon} alt="star icon" />
														<span className={cx("reward-value")}>{survey.starReward}</span>
													</div>
												)}
												{survey.diamondReward > 0 && (
													<div className={cx("reward-data", "flex")}>
														<img className={cx("reward-icon")} src={DiamondIcon} alt="diamond icon" />
														<span className={cx("reward-value")}>{survey.diamondReward}</span>
													</div>
												)}
											</div>
										</div>
									</div>
									<Button
										className={cx("mt-3", "survey-button")}
										label={survey.isParticipanted ? "Đã hoàn thành" : "Tham gia"}
										icon={survey.isParticipanted ? "pi pi-check-circle" : "pi pi-arrow-circle-right"}
										severity={survey.isParticipanted ? "success" : "info"}
										size="small"
										disabled={survey.isParticipanted}
										onClick={() => !survey.isParticipanted && handleOpenSurveyDialog(survey)}
									/>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className={cx("loading", "mt-5")}>
						<i className="pi pi-spin pi-spinner mr-2" style={{ fontSize: "1rem" }}></i>
						Đang tải danh sách khảo sát...
					</p>
				)}
			</div>
		</>
	);
}

export default Survey;
