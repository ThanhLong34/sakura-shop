import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ClassicMode.module.scss";
import SelectLevel from "@/browser/components/SelectLevel";

const cx = classNames.bind(styles);

function ClassicMode() {
	return (
		<div>
			<SelectLevel topicId={3} />
		</div>
	);
}

export default ClassicMode;
