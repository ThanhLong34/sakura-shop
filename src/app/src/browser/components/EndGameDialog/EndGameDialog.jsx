import { memo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./EndGameDialog.module.scss";

// Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import LevelIcon from "@/assets/images/LevelIcon.png";

import { Dialog } from "primereact/dialog";
import GradientButton from "../GradientButton";

const cx = classNames.bind(styles);

EndGameDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	gameReward: PropTypes.object,
	onResetGame: PropTypes.func,
};

EndGameDialog.defaultProps = {
	gameReward: {},
	onResetGame: () => {},
};

function EndGameDialog({ visible, setVisible, gameReward, onResetGame }) {
	const navigate = useNavigate();

	const handleExit = () => {
		navigate("/dashboard", {
			state: {
				prevRoute: "completed-game",
			},
		});

		setVisible(false);
	};

	return (
		<Dialog
			header="CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH LƯỢT CHƠI"
			headerStyle={{
				textAlign: "center",
				paddingBottom: "0.6rem",
			}}
			visible={visible}
			style={{ width: "650px", fontFamily: "Coiny" }}
			onHide={() => setVisible(false)}
			closable={false}
		>
			{gameReward && (
				<div className="grid">
					<div className="col-12">
						<h4 className={cx("heading")}>BẠN ĐÃ NHẬN ĐƯỢC</h4>
					</div>
					<div className="col-12">
						<div className="grid mt-2 mb-2">
							<div className="col-4">
								<div className={cx("item-data", "flex")}>
									<img className={cx("item-icon")} src={HealthIcon} alt="health icon" />
									<span className={cx("item-value")}>{gameReward.healthReward}</span>
								</div>
							</div>
							<div className="col-4">
								<div className={cx("item-data", "flex")}>
									<img className={cx("item-icon")} src={StarIcon} alt="star icon" />
									<span className={cx("item-value")}>{gameReward.starReward}</span>
								</div>
							</div>
							<div className="col-4">
								<div className={cx("item-data", "flex")}>
									<img className={cx("item-icon")} src={DiamondIcon} alt="diamond icon" />
									<span className={cx("item-value")}>{gameReward.diamondReward}</span>
								</div>
							</div>
							{gameReward.levelUp && (
								<div className="col-12">
									<div className={cx("item-data", "flex")}>
										<img className={cx("item-icon")} src={LevelIcon} alt="level icon" />
										<span className={cx("item-value")}>{gameReward.levelUp}</span>
										<span className={cx("level-up")}>
											Chúc mừng bạn <br /> Bạn đã lên cấp độ mới
										</span>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="col-6">
						<GradientButton type="primary" className="w-full" onClick={onResetGame}>
							Chơi lại
						</GradientButton>
					</div>
					<div className="col-6">
						<GradientButton className="w-full" onClick={handleExit}>
							Thoát
						</GradientButton>
					</div>
				</div>
			)}
		</Dialog>
	);
}

export default memo(EndGameDialog);
