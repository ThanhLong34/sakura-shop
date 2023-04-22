import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./EndGameDialog.module.scss";

// Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import ExperienceIcon from "@/assets/images/ExperienceIcon.png";
import LevelIcon from "@/assets/images/LevelIcon.png";

import { Dialog } from "primereact/dialog";

const cx = classNames.bind(styles);

EndGameDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	gameData: PropTypes.object,
};

EndGameDialog.defaultProps = {
	gameData: {},
};

function EndGameDialog({ visible, setVisible, gameData }) {
	return (
		<Dialog header="CHÚC MỪNG BẠN" visible={visible} style={{ width: "650px" }} onHide={() => setVisible(false)}>
			{gameData && (
				<div className="grid">
					<div className="col-6">
						<div className="grid mt-2">
							<div className="col-4">
								<div className={cx("gameData-data-g", "flex")}>
									<span className="data-template">
										<img
											className={cx("gameData-icon", "data-template-icon")}
											src={HealthIcon}
											alt="health icon"
										/>
										<span className="data-template-value">{gameData.healthReward}</span>
									</span>
								</div>
							</div>
							<div className="col-4">
								<div className={cx("gameData-data-g", "flex")}>
									<span className="data-template">
										<img
											className={cx("gameData-icon", "data-template-icon")}
											src={StarIcon}
											alt="star icon"
										/>
										<span className="data-template-value">{gameData.starReward}</span>
									</span>
								</div>
							</div>
							<div className="col-4">
								<div className={cx("gameData-data-g", "flex")}>
									<span className="data-template">
										<img
											className={cx("gameData-icon", "data-template-icon")}
											src={DiamondIcon}
											alt="diamond icon"
										/>
										<span className="data-template-value">{gameData.diamondReward}</span>
									</span>
								</div>
							</div>
							<div className="col-4">
								<div className={cx("gameData-data-g", "flex")}>
									<span className="data-template">
										<img
											className={cx("gameData-icon", "data-template-icon")}
											src={ExperienceIcon}
											alt="experience icon"
										/>
										<span className="data-template-value">{gameData.experienceReward}</span>
									</span>
								</div>
							</div>
							<div className="col-4">
								<div className={cx("gameData-data-g", "flex")}>
									<span className="data-template">
										<img
											className={cx("gameData-icon", "data-template-icon")}
											src={LevelIcon}
											alt="level icon"
										/>
										<span className="data-template-value">{gameData.levelUp}</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Dialog>
	);
}

export default EndGameDialog;
