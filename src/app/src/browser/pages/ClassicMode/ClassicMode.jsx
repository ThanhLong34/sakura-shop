import { useSelector } from "react-redux";
import SelectLevel from "@/browser/components/SelectLevel";
import NotAllowedToPlay from "@/browser/components/NotAllowedToPlay";

function ClassicMode() {
	const playerAccount = useSelector((state) => state.player.account);

	// Default is lipstick topic
	const lipstickTopicId = 3;

	if (+playerAccount.health > 0) {
		return (
			<div>
				<SelectLevel topicId={lipstickTopicId} />
			</div>
		);
	} else {
		return (
			<div>
				<NotAllowedToPlay />
			</div>
		);
	}
}

export default ClassicMode;
