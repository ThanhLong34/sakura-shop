import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Answer.module.scss";

const cx = classNames.bind(styles);

Answer.propTypes = {
	id: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["right", "wrong"]).isRequired,
	content: PropTypes.string,
	onRemove: PropTypes.func,
};

Answer.defaultTypes = {
	content: "",
	onRemove: () => {},
};

function Answer({ id, type, content, onRemove }) {
	const handleRemove = (e) => {
		onRemove(e, id);
	};

	const iconTemplate = () => {
		if (type === "right") {
			return <i className="pi pi-check-circle" />;
		} else if (type === "wrong") {
			return <i className="pi pi-times-circle" />;
		}
	};

	return (
		<div className={cx("wrapper", type)}>
			<span className={cx("icon")}>{iconTemplate()}</span>
			<span className={cx("text")}>{content}</span>
			<button className={cx("remove-button")} onClick={handleRemove}>
				<i className="pi pi-times" />
			</button>
		</div>
	);
}

export default Answer;
