import { useSelector } from "react-redux";
import SelectLevel from "@/mobile/components/SelectLevel";
import NotAllowedToPlay from "@/mobile/components/NotAllowedToPlay";
import classNames from "classnames/bind";
import styles from "./ClassicMode.module.scss";

const cx = classNames.bind(styles);

function ClassicMode() {
	const playerAccount = useSelector((state) => state.player.account);

	// Default is lipstick topic
	const lipstickTopicId = 3;

	if (+playerAccount.health > 0) {
		return (
			<div className={cx("wrapper")}>
				<SelectLevel topicId={lipstickTopicId} />
			</div>
		);
	} else {
		return (
			<div className={cx("wrapper")}>
				<NotAllowedToPlay />
			</div>
		);
	}
}

export default ClassicMode;
