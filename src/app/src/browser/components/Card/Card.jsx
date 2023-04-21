import { memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";

import BackFaceCardImage from "@/assets/images/BackFaceCard.png";

const cx = classNames.bind(styles);

Card.propTypes = {
	card: PropTypes.object.isRequired,
	onClick: PropTypes.func,
};

Card.defaultProps = {
	onClick: () => {},
};

function Card({ card, onClick }) {
	const handleClick = () => {
		onClick(card);
	};

	return (
		<div className={cx("card", { flipped: card.flipped })}>
			<img className={cx("front")} src={card.imageUrl} alt="card front" />
			<img className={cx("back")} src={BackFaceCardImage} alt="card front" onClick={handleClick} />
		</div>
	);
}

export default memo(Card);
