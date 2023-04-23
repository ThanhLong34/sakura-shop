import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./OptionalMode.module.scss";
import NotAllowedToPlay from "@/browser/components/NotAllowedToPlay";
import LockedMode from "@/browser/components/LockedMode";

const cx = classNames.bind(styles);

function OptionalMode() {
	const playerAccount = useSelector((state) => state.player.account);

	const levelRequire = 10;

	if (playerAccount.level < levelRequire) {
		return (
			<div>
				<LockedMode levelRequire={levelRequire} />
			</div>
		);
	}

	if (playerAccount.health > 0) {
		return <div>OptionalMode</div>;
	} else {
		return (
			<div>
				<NotAllowedToPlay />
			</div>
		);
	}
}

export default OptionalMode;
