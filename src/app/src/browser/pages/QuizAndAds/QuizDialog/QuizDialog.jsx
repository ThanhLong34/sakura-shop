import { useState, memo, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./QuizDialog.module.scss";
import { updatePlayerAccountGameData } from "@/store/playerSlice";

import questionApi from "@/apis/questionApi";
import playerApi from "@/apis/playerApi";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

//Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import { Toast } from "primereact/toast";

const cx = classNames.bind(styles);

QuizDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
};

function QuizDialog({ visible, setVisible }) {
	const dispatch = useDispatch();
	const playerAccount = useSelector((state) => state.player.account);

	const toastRef = useRef(null);

	//? States
	const [questions, setQuestions] = useState([]);
	const [questionsAppeared, setQuestionsAppeared] = useState([]);
	const [questionRandom, setQuestionRandom] = useState(null);
	const [answers, setAnswers] = useState(null);
	const [answerSelected, setAnswerSelected] = useState(null);
	const [submited, setSubmited] = useState(false);

	//? Effects
	useLayoutEffect(() => {
		questionApi.getAll().then((response) => {
			if (response.code === 1) {
				const questions = response.data.map((question) => ({
					...question,
					id: +question.id,
					healthReward: +question.healthReward,
					starReward: +question.starReward,
					diamondReward: +question.diamondReward,
				}));

				const questionRandom = getQuestionRandom(questions);

				setQuestions(questions);
				setQuestionsAppeared((prevState) => [...prevState, questionRandom]);
				setQuestionRandom(questionRandom);
			}
		});
	}, []);

	//? Functions
	const getQuestionRandom = (questions) => {
		let questionRandom = null;

		if (questions && questions.length > 0) {
			do {
				questionRandom = questions[Math.floor(Math.random() * questions.length)];
			} while (
				questionsAppeared.find((i) => i.id === questionRandom.id) &&
				questionsAppeared.length !== questions.length
			);
		}

		if (questionsAppeared.length === questions.length) {
			setQuestionsAppeared([]);
		}

		setAnswers(
			questionRandom.answers.map((answer) => ({
				...answer,
				id: +answer.id,
				questionId: +answer.questionId,
				isRight: +answer.isRight === 1,
			}))
		);

		return questionRandom;
	};

	//? Handles
	const handleCloseDialog = () => {
		setVisible(false);
		const questionRandom = getQuestionRandom(questions);
		setQuestionsAppeared((prevState) => [...prevState, questionRandom]);
		setQuestionRandom(questionRandom);
		setSubmited(false);
		setAnswerSelected(null);
	};
	const handleSubmit = () => {
		if (!answerSelected) {
			return;
		}

		if (submited) {
			const questionRandom = getQuestionRandom(questions);
			setQuestionsAppeared((prevState) => [...prevState, questionRandom]);
			setQuestionRandom(questionRandom);
			setSubmited(false);
			setAnswerSelected(null);
		} else {
			if (answerSelected.isRight) {
				const gameData = {
					health: playerAccount.health + questionRandom.healthReward,
					star: playerAccount.star + questionRandom.starReward,
					diamond: playerAccount.diamond + questionRandom.diamondReward,
				};

				playerApi
					.updateGameData({
						...gameData,
						id: playerAccount.id,
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
			}
			setSubmited(true);
		}
	};

	return (
		<>
			{createPortal(<Toast ref={toastRef} position="top-right" />, document.body)}
			<Dialog
				header="TRẢ LỜI CÂU HỎI TRẮC NGHIỆM"
				visible={visible}
				style={{ width: "650px" }}
				onHide={handleCloseDialog}
				closable={false}
			>
				{questionRandom && (
					<div>
						<div>
							<h4 className={cx("question-content")}>{questionRandom.content}</h4>
							<ul className={cx("answers")}>
								{answers &&
									answers.map((a) => {
										return (
											<li
												key={a.id}
												className={cx("answer", { selected: answerSelected?.id === a.id })}
												onClick={() => !submited && setAnswerSelected(a)}
											>
												{a.content}
											</li>
										);
									})}
							</ul>
						</div>
						<div className={cx("mt-4")}>
							<h4 className={cx("heading")}>Trả lời đúng câu hỏi này bạn sẽ nhận được:</h4>
							<div className={cx("rewards")}>
								{questionRandom.healthReward > 0 && (
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
								)}
							</div>
						</div>
						{submited && answerSelected && (
							<div className="mt-4">
								{(() => {
									if (answerSelected.isRight) {
										return <h5 className={cx("congratulation")}>Chúc mừng, bạn đã trả lời đúng!</h5>;
									} else {
										return <h5 className={cx("solace")}>Ôi không, bạn đã trả lời sai!</h5>;
									}
								})()}
							</div>
						)}
					</div>
				)}
				<div className="flex align-items-center justify-content-end mt-4">
					<Button className="mr-3" label="Đóng" severity="danger" outlined onClick={handleCloseDialog} />
					<Button
						disabled={!answerSelected}
						label={submited ? "Câu hỏi tiếp theo" : "Gửi lựa chọn"}
						severity="primary"
						onClick={handleSubmit}
					/>
				</div>
			</Dialog>
		</>
	);
}

export default memo(QuizDialog);
