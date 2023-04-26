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
import { Button } from "primereact/button";

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
		<div className="card">
			<div className="flex align-items-center justify-content-center mb-3">
				{showGoBackButton && (
					<IconButton className={cx("go-back-btn")} icon="pi pi-chevron-left" onClick={onGoBack} />
				)}
				<h5 className={cx("heading")}>CHỌN CẤP ĐỘ CHƠI</h5>
			</div>
			<div className="grid">
				<div className="col-12">
					<div className={cx("level-item")}>
						<div className={cx("level-item-image", "mb-2")}>
							<img src={EasyLevelImage} alt="easy level" />
						</div>
						<div className={cx("level-item-heading")}>Dễ</div>
						<div className={cx("level-item-quantity-card", "mb-3")}>
							{gameConvention.levels.easy.quantityCard} thẻ bài
						</div>
						<Button
							label="Chọn dễ"
							className="w-full"
							onClick={() => handlePlayGame(gameConvention.levels.easy.name)}
						/>
					</div>
				</div>
				<div className="col-12">
					<div className={cx("level-item")}>
						<div className={cx("level-item-image", "mb-2")}>
							<img src={NormalLevelImage} alt="normal level" />
						</div>
						<div className={cx("level-item-heading")}>Trung bình</div>
						<div className={cx("level-item-quantity-card", "mb-3")}>
							{gameConvention.levels.normal.quantityCard} thẻ bài
						</div>
						<Button
							label="Chọn trung bình"
							className="w-full"
							onClick={() => handlePlayGame(gameConvention.levels.normal.name)}
						/>
					</div>
				</div>
				<div className="col-12">
					<div className={cx("level-item")}>
						<div className={cx("level-item-image", "mb-2")}>
							<img src={HardLevelImage} alt="hard level" />
						</div>
						<div className={cx("level-item-heading")}>Khó</div>
						<div className={cx("level-item-quantity-card", "mb-3")}>
							{gameConvention.levels.hard.quantityCard} thẻ bài
						</div>
						<Button
							label="Chọn khó"
							className="w-full"
							onClick={() => handlePlayGame(gameConvention.levels.hard.name)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SelectLevel;
