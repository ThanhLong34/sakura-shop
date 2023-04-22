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
import levelApi from "@/apis/levelApi";

import Card from "@/browser/components/Card";
import TimeCounter from "@/browser/components/TimeCounter";
import ClockIcon from "@/assets/images/ClockIcon.png";
import HeartIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";

import EndGameDialog from "@/browser/components/EndGameDialog";

const cx = classNames.bind(styles);

function Gameplay() {
	const dispatch = useDispatch();
	const playerAccount = useSelector((state) => state.player.account);
	const { topicId, selectedLevel } = useParams();

	const timeCounterRef = useRef(null);

	const [cards, setCards] = useState([]);
	const [cardsReal, setCardsReal] = useState([]);
	const [choiceCardOne, setChoiceCardOne] = useState(null);
	const [choiceCardTwo, setChoiceCardTwo] = useState(null);
	const [disableClickCard, setDisableClickCard] = useState(false);
	const [levels, setLevels] = useState([]);
	const [gameDataUpdate, setGameDataUpdate] = useState(null);
	const [endGameDialogVisible, setEndGameDialogVisible] = useState(false);

	const quantityCardReal = useMemo(() => {
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
		// Get levels
		(async () => {
			const getLevelsResponse = await levelApi.getAll();
			if (getLevelsResponse.code === 1) {
				setLevels(
					getLevelsResponse.data.map((level) => ({
						...level,
						id: +level.id,
						levelNumber: +level.levelNumber,
						experienceRequired: +level.experienceRequired,
						healthReward: +level.healthReward,
						starReward: +level.starReward,
						diamondReward: +level.diamondReward,
					}))
				);
			}
		})();

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
						healthReward: +card.healthReward,
						starReward: +card.starReward,
						diamondReward: +card.diamondReward,
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
						healthReward: +card.healthReward,
						starReward: +card.starReward,
						diamondReward: +card.diamondReward,
					}))
				);
			}

			const cardsShuffled = getCardsShuffled(arrayDestructuringNested(_cards));
			setCards(cardsShuffled);
			setCardsReal(
				cardsShuffled.filter((value, index, array) => array.findIndex((m) => m.id === value.id) === index)
			);
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
	// Listening for win
	useEffect(() => {
		if (cards.length > 0 && cards.every((card) => card.matched === true)) {
			handleEndGame();
		}
	}, [cards]);

	//? Handles
	const getCardsShuffled = (_cards) => {
		const saveCards = [..._cards].filter((i, idx) => idx < quantityCardReal);
		const cardsShuffled = [...saveCards, ...saveCards]
			.sort(() => Math.random() - 0.5)
			.map((card, idx) => ({ ...card, idx, flipped: false, matched: false }));
		return cardsShuffled;
	};
	const resetGame = () => {
		const cardsShuffled = getCardsShuffled(cards);
		setCards(cardsShuffled);
		setChoiceCardOne(null);
		setChoiceCardTwo(null);
	};
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

		const gameData = {};

		gameData.health = cardsReal.reduce((prevValue, curValue) => {
			return prevValue + curValue.healthReward;
		}, playerAccount.health);

		gameData.star = cardsReal.reduce((prevValue, curValue) => {
			return prevValue + curValue.starReward;
		}, playerAccount.star);

		gameData.diamond = cardsReal.reduce((prevValue, curValue) => {
			return prevValue + curValue.diamondReward;
		}, playerAccount.diamond);

		gameData.experience = playerAccount.experience + Math.ceil(((quantityCardReal * 2) / times.seconds) * 100);

		if (levels) {
			const nextLevel = levels[levels.findIndex((l) => l.id === playerAccount.level) + 1];
			if (nextLevel && gameData.experience >= nextLevel.experienceRequired) {
				gameData.level = nextLevel;
			}
		}

		playerApi.updateGameData(gameData).then((response) => {
			if (response.code === 1) {
				setGameDataUpdate(gameData);
			}
		});
	};

	return (
		<>
			<EndGameDialog visible={endGameDialogVisible} setVisible={setEndGameDialogVisible} gameData={gameDataUpdate} />
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
		</>
	);
}

export default Gameplay;
