import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

import HeartIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import LevelIcon from "@/assets/images/LevelIcon.png";
import ExperienceIcon from "@/assets/images/ExperienceIcon.png";

const cx = classNames.bind(styles);

function Profile() {
	const playerAccount = useSelector((state) => state.player.account);

	return (
		<div className={cx("profile")}>
			<ul className={cx("game-data")}>
				<li className={cx("game-data-item")}>
					<img className={cx("game-data-image")} src={HeartIcon} alt="heart" />
					<span className={cx("game-data-value")}>{playerAccount.health}</span>
				</li>
				<li className={cx("game-data-item")}>
					<img className={cx("game-data-image")} src={StarIcon} alt="star" />
					<span className={cx("game-data-value")}>{playerAccount.star}</span>
				</li>
				<li className={cx("game-data-item")}>
					<img className={cx("game-data-image")} src={DiamondIcon} alt="diamond" />
					<span className={cx("game-data-value")}>{playerAccount.diamond}</span>
				</li>
				<li className={cx("game-data-item")}>
					<img className={cx("game-data-image")} src={LevelIcon} alt="level" />
					<span className={cx("game-data-value")}>{playerAccount.level}</span>
				</li>
				<li className={cx("game-data-item")}>
					<img className={cx("game-data-image")} src={ExperienceIcon} alt="experience" />
					<span className={cx("game-data-value")}>{playerAccount.experience}</span>
				</li>
			</ul>
		</div>
	);
}

export default Profile;
