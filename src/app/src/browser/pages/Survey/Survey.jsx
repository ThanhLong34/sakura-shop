import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Survey.module.scss";
import { updatePlayerAccountGameData } from "@/store/playerSlice";
import limitedNumbersApi from "@/apis/limitedNumbersApi";

import { Button } from "primereact/button";

const cx = classNames.bind(styles);

function Survey() {
	const dispatch = useDispatch();
	const playerAccount = useSelector((state) => state.player.account);

	const handleOpenSurveyDialog = () => {};

	return (
		<>
			{/* <QuizDialog visible={quizDialogVisible} setVisible={setQuizDialogVisible} /> */}
			<div className={cx("card", "wrapper")}>
				<h5 className={cx("heading1")}>Danh sách khảo sát</h5>
				<h6 className={cx("heading2", "mt-4")}>
					<span>Tham gia khảo sát để nhận về các phần thưởng hấp dẫn bạn nhé!</span>
				</h6>
				<ul>
					<li>Khảo sát 1</li>
					<li>Khảo sát 2</li>
				</ul>
			</div>
		</>
	);
}

export default Survey;
