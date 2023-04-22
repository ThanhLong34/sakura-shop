import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./OptionalMode.module.scss";
import NotAllowedToPlay from "@/browser/components/NotAllowedToPlay";

const cx = classNames.bind(styles);

function OptionalMode() {
	const playerAccount = useSelector((state) => state.player.account);

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
