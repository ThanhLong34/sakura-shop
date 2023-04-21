import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Gameplay.module.scss";
import cardApi from "@/apis/cardApi";
import { arrayDestructuringNested } from "@/helpers/destructor";

const cx = classNames.bind(styles);

function Gameplay() {
	const { topicId, selectedLevel } = useParams();
	const [cards, setCards] = useState([]);

	let quantityCard = 0;

	if (selectedLevel === 'easy') {
		// quantityCard = 
	}

	useEffect(() => {
		(async () => {
			const _cards = [];

			const getCommonCardResponse = await cardApi.getAll({
				limit: 100,
				offset: 0,
				fillType: "topicId",
				fillValue: 1,
			});
			if (getCommonCardResponse.code === 1) {
				_cards.push(
					getCommonCardResponse.data.map((card) => ({
						...card,
						id: +card.id,
					}))
				);
			}

			const getCardByTopicIdResponse = await cardApi.getAll({
				limit: 100,
				offset: 0,
				fillType: "topicId",
				fillValue: topicId,
			});
			if (getCardByTopicIdResponse.code === 1) {
				_cards.push(
					getCardByTopicIdResponse.data.map((card) => ({
						...card,
						id: +card.id,
					}))
				);
			}

			setCards(arrayDestructuringNested(_cards));
		})();
	}, []);

	return <div className={cx("grid-card")}></div>;
}

export default Gameplay;
