import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Gameplay.module.scss";

const cx = classNames.bind(styles);

function Gameplay() {
	const { topicId, selectedLevel } = useParams();

	console.log(topicId, selectedLevel);

	return (
		<div>
			
		</div>
	);
}

export default Gameplay;
