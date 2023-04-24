import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import dashboardImage from "@/assets/images/Dashboard.png";

import playerApi from "@/apis/playerApi";
import giftApi from "@/apis/giftApi";
import cardApi from "@/apis/cardApi";
import topicApi from "@/apis/topicApi";
import questionApi from "@/apis/questionApi";
import advertisementApi from "@/apis/advertisementApi";

import { Toast } from "primereact/toast";

const cx = classNames.bind(styles);

function Dashboard() {
	//? States
	const [players, setPlayers] = useState([]);
	const [gifts, setGifts] = useState([]);
	const [cards, setCards] = useState([]);
	const [topics, setTopics] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [advertisements, setAdvertisements] = useState([]);

	//? Refs
	const toastRef = useRef(null);

	//? Effects
	useEffect(() => {
		(async () => {
			const getPlayersResponse = await playerApi.getAll();
			if (getPlayersResponse.code === 1) {
				setPlayers(getPlayersResponse.data);
			}

			const getGiftsResponse = await giftApi.getAll();
			if (getGiftsResponse.code === 1) {
				setGifts(getGiftsResponse.data);
			}

			const getCardsResponse = await cardApi.getAll();
			if (getCardsResponse.code === 1) {
				setCards(getCardsResponse.data);
			}

			const getTopicsResponse = await topicApi.getAll();
			if (getTopicsResponse.code === 1) {
				setTopics(getTopicsResponse.data);
			}

			const getQuestionsResponse = await questionApi.getAll();
			if (getQuestionsResponse.code === 1) {
				setQuestions(getQuestionsResponse.data);
			}

			const getAdvertisementsResponse = await advertisementApi.getAll();
			if (getAdvertisementsResponse.code === 1) {
				setAdvertisements(getAdvertisementsResponse.data);
			}
		})();
	}, []);

	return (
		<div>
			{createPortal(<Toast ref={toastRef} />, document.body)}
			<div className="grid">
				<div className="col-12 md:col-4">
					<div className={cx("card", "statistical", "player")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Người chơi</h6>
							<h6 className={cx("statistical-value")}>{players.length}</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-user" />
						</div>
					</div>
				</div>
				<div className="col-12 md:col-4">
					<div className={cx("card", "statistical", "gift")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Phần thưởng</h6>
							<h6 className={cx("statistical-value")}>{gifts.length}</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-gift" />
						</div>
					</div>
				</div>
				<div className="col-12 md:col-4">
					<div className={cx("card", "statistical", "card-s")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Thẻ bài</h6>
							<h6 className={cx("statistical-value")}>{cards.length}</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-tablet" />
						</div>
					</div>
				</div>
				<div className="col-12 md:col-4">
					<div className={cx("card", "statistical", "topic")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Chủ đề</h6>
							<h6 className={cx("statistical-value")}>{topics.length}</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-th-large" />
						</div>
					</div>
				</div>
				<div className="col-12 md:col-4">
					<div className={cx("card", "statistical", "question")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Câu hỏi</h6>
							<h6 className={cx("statistical-value")}>{questions.length}</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-question-circle" />
						</div>
					</div>
				</div>
				<div className="col-12 md:col-4">
					<div className={cx("card", "statistical", "advertisement")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Quảng cáo</h6>
							<h6 className={cx("statistical-value")}>{advertisements.length}</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-verified" />
						</div>
					</div>
				</div>
			</div>
			<div className="card mt-3">
				<div className="grid">
					<div className="col-12 md:col-7">
						<h1 className="mr-2">Chào mừng bạn đến với hệ thống quản trị</h1>
						<h3 className="mr-2">Chúc bạn một ngày mới tốt đẹp ❤️</h3>
					</div>
					<div className="col-12 md:col-5">
						<div>
							<img src={dashboardImage} alt="dashboard image" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
