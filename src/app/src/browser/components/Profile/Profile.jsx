import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

import AccountIcon from "@/assets/images/AccountIcon.png";
import HeartIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import LevelIcon from "@/assets/images/LevelIcon.png";
import ExperienceIcon from "@/assets/images/ExperienceIcon.png";

const cx = classNames.bind(styles);

function Profile() {
	const account = useSelector((state) => state.player.account);

	return (
		<div className={cx("profile", "background-transparent")}>
			<ul className={cx("game-data")}>
				<li className={cx("game-data-item")}>
					<img className={cx("game-data-image")} src={HeartIcon} alt="heart" />
					<span className={cx("game-data-value")}>{account.health}</span>
				</li>
				<li className={cx("game-data-item")}>
					<img className={cx("game-data-image")} src={StarIcon} alt="star" />
					<span className={cx("game-data-value")}>{account.star}</span>
				</li>
				<li className={cx("game-data-item")}>
					<img className={cx("game-data-image")} src={DiamondIcon} alt="diamond" />
					<span className={cx("game-data-value")}>{account.diamond}</span>
				</li>
				<li className={cx("game-data-item")}>
					<img className={cx("game-data-image")} src={LevelIcon} alt="level" />
					<span className={cx("game-data-value")}>{account.level}</span>
				</li>
				<li className={cx("game-data-item")}>
					<img className={cx("game-data-image")} src={ExperienceIcon} alt="experience" />
					<span className={cx("game-data-value")}>{account.experience}</span>
				</li>
			</ul>
			<div className={cx("user")}>
				<img className={cx("user-image")} src={AccountIcon} alt="user" />
				<span className={cx("user-nickname")}>{account.nickname}</span>
			</div>
		</div>
	);
}

export default Profile;
