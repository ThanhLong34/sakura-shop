import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SelectLevel.module.scss";

// Images
import EasyLevelImage from "@/assets/images/levels/EasyLevel.png";
import NormalLevelImage from "@/assets/images/levels/NormalLevel.png";
import HardLevelImage from "@/assets/images/levels/HardLevel.png";

import { gameConvention } from "@/constant";
import IconButton from "../IconButton";

const cx = classNames.bind(styles);

SelectLevel.propTypes = {
	topicId: PropTypes.number.isRequired,
	showGoBackButton: PropTypes.bool,
	onGoBack: PropTypes.func,
};

SelectLevel.defaultProps = {
	showGoBackButton: false,
	onGoBack: () => {},
};

function SelectLevel({ topicId, showGoBackButton, onGoBack }) {
	const navigate = useNavigate();

	const handlePlayGame = (selectedLevel) => {
		navigate(`/gameplay/${topicId}/${selectedLevel}`);
	};

	return (
		<>
			<div className="grid">
				<div className="col-7 col-offset-2">
					<div className="flex align-items-center justify-content-center">
						{showGoBackButton && (
							<IconButton className={cx("go-back-btn")} icon="pi pi-chevron-left" onClick={onGoBack} />
						)}
						<h5 className={cx("heading", "mt-3 mb-3")}>CHỌN CẤP ĐỘ CHƠI</h5>
					</div>
				</div>
			</div>
			<div className="grid">
				<div className="col-1"></div>
				<div className="col-3">
					<div
						className={cx("level-item", "card")}
						onClick={() => handlePlayGame(gameConvention.levels.easy.name)}
					>
						<div className={cx("level-item-image")}>
							<img src={EasyLevelImage} alt="easy level" />
						</div>
						<div className={cx("level-item-heading")}>Dễ</div>
						<div className={cx("level-item-quantity-card")}>
							{gameConvention.levels.easy.quantityCard} thẻ bài
						</div>
						<div className={cx("level-item-grid")}>
							{new Array(gameConvention.levels.easy.quantityCard).fill(null).map((item, idx) => (
								<div key={idx} className={cx("level-item-grid-item")}></div>
							))}
						</div>
					</div>
				</div>
				<div className="col-3">
					<div
						className={cx("level-item", "card")}
						onClick={() => handlePlayGame(gameConvention.levels.normal.name)}
					>
						<div className={cx("level-item-image")}>
							<img src={NormalLevelImage} alt="easy level" />
						</div>
						<div className={cx("level-item-heading")}>Trung bình</div>
						<div className={cx("level-item-quantity-card")}>
							{gameConvention.levels.normal.quantityCard} thẻ bài
						</div>
						<div className={cx("level-item-grid")}>
							{new Array(gameConvention.levels.normal.quantityCard).fill(null).map((item, idx) => (
								<div key={idx} className={cx("level-item-grid-item")}></div>
							))}
						</div>
					</div>
				</div>
				<div className="col-3">
					<div
						className={cx("level-item", "card")}
						onClick={() => handlePlayGame(gameConvention.levels.hard.name)}
					>
						<div className={cx("level-item-image")}>
							<img src={HardLevelImage} alt="easy level" />
						</div>
						<div className={cx("level-item-heading")}>Khó</div>
						<div className={cx("level-item-quantity-card")}>
							{gameConvention.levels.hard.quantityCard} thẻ bài
						</div>
						<div className={cx("level-item-grid", "grid-col-5")}>
							{new Array(gameConvention.levels.hard.quantityCard).fill(null).map((item, idx) => (
								<div key={idx} className={cx("level-item-grid-item")}></div>
							))}
						</div>
					</div>
				</div>
				<div className="col-1"></div>
			</div>
		</>
	);
}

export default SelectLevel;
