import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Gameplay.module.scss";
import cardApi from "@/apis/cardApi";
import { arrayDestructuringNested } from "@/helpers/destructor";
import { gameConvention } from "@/constant";
import { updatePlayerAccountGameData } from "@/store/playerSlice";

import playerApi from "@/apis/playerApi";

import Card from "@/browser/components/Card";
import TimeCounter from "@/browser/components/TimeCounter";
import ClockIcon from "@/assets/images/ClockIcon.png";
import HeartIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";

const cx = classNames.bind(styles);

function Gameplay() {
	const dispatch = useDispatch();
	const playerAccount = useSelector((state) => state.player.account);
	const { topicId, selectedLevel } = useParams();

	const timeCounterRef = useRef(null);

	const [cards, setCards] = useState([]);
	const [choiceCardOne, setChoiceCardOne] = useState(null);
	const [choiceCardTwo, setChoiceCardTwo] = useState(null);
	const [disableClickCard, setDisableClickCard] = useState(false);

	const quantityCard = useMemo(() => {
		if (selectedLevel === gameConvention.levels.easy.name) {
			return gameConvention.levels.easy.quantityCard / 2;
		} else if (selectedLevel === gameConvention.levels.normal.name) {
			return gameConvention.levels.normal.quantityCard / 2;
		} else if (selectedLevel === gameConvention.levels.hard.name) {
			return gameConvention.levels.hard.quantityCard / 2;
		} else {
			return 0;
		}
	}, [selectedLevel]);

	//? Effects
	useEffect(() => {
		// Get cards
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

		// Check health & subtract
		if (playerAccount.health > 0) {
			(async () => {
				const response = await playerApi.updateGameData({ id: playerAccount.id, health: playerAccount.health - 1 });
				if (response.code === 1) {
					const action = updatePlayerAccountGameData({ health: playerAccount.health - 1 });
					dispatch(action);
				}
			})();
		}
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
	const handleEndGame = () => {
		const times = timeCounterRef.current.getTimes();
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
			<div className={cx("card background-transparent ml-4", "game-data")}>
				<div className={cx("game-data-item")}>
					<img src={ClockIcon} alt="clock" />
					<TimeCounter ref={timeCounterRef} />
				</div>
				<div className={cx("game-data-item")}>
					<img src={HeartIcon} alt="heart" />
					<span>2</span>
				</div>
				<div className={cx("game-data-item")}>
					<img src={StarIcon} alt="star" />
					<span>2</span>
				</div>
				<div className={cx("game-data-item")}>
					<img src={DiamondIcon} alt="diamond" />
					<span>2</span>
				</div>
				<button onClick={handleEndGame}>Click</button>
			</div>
		</div>
	);
}

export default Gameplay;
