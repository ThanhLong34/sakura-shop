import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Gameplay.module.scss";
import cardApi from "@/apis/cardApi";
import { arrayDestructuringNested } from "@/helpers/destructor";

import Card from "@/browser/components/Card";

const cx = classNames.bind(styles);

function Gameplay() {
	const { topicId, selectedLevel } = useParams();
	const [cards, setCards] = useState([]);
	const [choiceCardOne, setChoiceCardOne] = useState(null);
	const [choiceCardTwo, setChoiceCardTwo] = useState(null);
	const [disableClickCard, setDisableClickCard] = useState(false);

	const quantityCard = useMemo(() => {
		if (selectedLevel === "easy") {
			return 6;
		} else if (selectedLevel === "normal") {
			return 8;
		} else if (selectedLevel === "hard") {
			return 10;
		} else {
			return 0;
		}
	}, [selectedLevel]);

	//? Effects
	// Get cards
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

			const cardsShuffled = getCardsShuffled(arrayDestructuringNested(_cards));
			setCards(cardsShuffled);
		})();
	}, []);
	// Compare 2 selected cards
	useEffect(() => {
		if (choiceCardOne && choiceCardTwo) {
			setDisableClickCard(true);

			if (choiceCardOne.id === choiceCardTwo.id) {
				setCards((prevCards) =>
					prevCards.map((card) => {
						if (card.id === choiceCardOne.id) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					})
				);
				resetTurn();
			} else {
				setTimeout(() => {
					setCards((prevCards) =>
						prevCards.map((card) => {
							if (card.id === choiceCardOne.id || card.id === choiceCardTwo.id) {
								return { ...card, flipped: false };
							} else {
								return card;
							}
						})
					);
					resetTurn();
				}, 1200);
			}
		}
	}, [choiceCardOne, choiceCardTwo]);

	//? Handles
	const getCardsShuffled = (_cards) => {
		const saveCards = [..._cards].filter((i, idx) => idx < quantityCard);
		const cardsShuffled = [...saveCards, ...saveCards]
			.sort(() => Math.random() - 0.5)
			.map((card, idx) => ({ ...card, idx, flipped: false, matched: false }));
		return cardsShuffled;
	};
	const resetGame = useCallback(() => {
		const cardsShuffled = getCardsShuffled(cards);
		setCards(cardsShuffled);
		setChoiceCardOne(null);
		setChoiceCardTwo(null);
	}, []);
	const resetTurn = () => {
		setDisableClickCard(false);
		setChoiceCardOne(null);
		setChoiceCardTwo(null);
	};
	const handleClickCard = (card) => {
		if (!disableClickCard) {
			!choiceCardOne ? setChoiceCardOne(card) : setChoiceCardTwo(card);
			setCards((prevCards) =>
				prevCards.map((c) => ({
					...c,
					flipped: c.idx === card.idx || c.idx === choiceCardOne?.idx || c.idx === choiceCardTwo?.idx || c.matched,
				}))
			);
		}
	};

	return (
		<div className={cx("gameplay")}>
			<div
				className={cx("board", {
					disable: disableClickCard,
					[selectedLevel]: selectedLevel,
				})}
			>
				{cards && cards.map((card) => <Card key={card.idx} card={card} onClick={handleClickCard} />)}
			</div>
			<div className="card background-transparent">
				
			</div>
		</div>
	);
}

export default Gameplay;
