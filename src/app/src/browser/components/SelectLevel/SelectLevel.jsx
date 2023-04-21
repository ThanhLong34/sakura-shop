import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SelectLevel.module.scss";

// Images
import EasyLevelImage from "@/assets/images/levels/EasyLevel.png";
import NormalLevelImage from "@/assets/images/levels/NormalLevel.png";
import HardLevelImage from "@/assets/images/levels/HardLevel.png";

const cx = classNames.bind(styles);

SelectLevel.propTypes = {
	topicId: PropTypes.number.isRequired,
};

function SelectLevel({ topicId }) {
	const navigate = useNavigate();
	const gameDataValue = useSelector((state) => state.gameData.value);
	const [levels, setLevels] = useState([]);

	useEffect(() => {
		setLevels(
			gameDataValue
				.filter((gameData) => {
					const id = +gameData.id;
					return id === 3 || id === 4 || id === 5;
				})
				.map((gameData) => ({
					...gameData,
					id: +gameData.id,
					value: +gameData.value,
				}))
		);
	}, gameDataValue);

	const handlePlayGame = (selectedLevel) => {
		navigate(`/gameplay/${topicId}/${selectedLevel}`);
	};

	return (
		<>
			<div className="grid">
				<div className="col-7 col-offset-2">
					<h5 className={cx("heading", "mt-3 mb-3")}>CHỌN CẤP ĐỘ CHƠI</h5>
				</div>
			</div>
			<div className="grid">
				<div className="col-1"></div>
				<div className="col-3">
					<div className={cx("level-item", "card")} onClick={() => handlePlayGame("easy")}>
						<div className={cx("level-item-image")}>
							<img src={EasyLevelImage} alt="easy level" />
						</div>
						<div className={cx("level-item-heading")}>Dễ</div>
						<div className={cx("level-item-quantity-card")}>{levels[0]?.value ?? null} thẻ bài</div>
						<div className={cx("level-item-grid")}>
							{levels[0]?.value &&
								new Array(levels[0]?.value)
									.fill(null)
									.map((item, idx) => <div key={idx} className={cx("level-item-grid-item")}></div>)}
						</div>
					</div>
				</div>
				<div className="col-3">
					<div className={cx("level-item", "card")} onClick={() => handlePlayGame("normal")}>
						<div className={cx("level-item-image")}>
							<img src={NormalLevelImage} alt="easy level" />
						</div>
						<div className={cx("level-item-heading")}>Trung bình</div>
						<div className={cx("level-item-quantity-card")}>{levels[1]?.value ?? null} thẻ bài</div>
						<div className={cx("level-item-grid")}>
							{levels[1]?.value &&
								new Array(levels[1]?.value)
									.fill(null)
									.map((item, idx) => <div key={idx} className={cx("level-item-grid-item")}></div>)}
						</div>
					</div>
				</div>
				<div className="col-3">
					<div className={cx("level-item", "card")} onClick={() => handlePlayGame("hard")}>
						<div className={cx("level-item-image")}>
							<img src={HardLevelImage} alt="easy level" />
						</div>
						<div className={cx("level-item-heading")}>Khó</div>
						<div className={cx("level-item-quantity-card")}>{levels[2]?.value ?? null} thẻ bài</div>
						<div className={cx("level-item-grid", "grid-col-5")}>
							{levels[2]?.value &&
								new Array(levels[2]?.value)
									.fill(null)
									.map((item, idx) => <div key={idx} className={cx("level-item-grid-item")}></div>)}
						</div>
					</div>
				</div>
				<div className="col-1"></div>
			</div>
		</>
	);
}

export default SelectLevel;
