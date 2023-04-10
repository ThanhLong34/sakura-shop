import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./UpdateItemDialog.module.scss";

// Icons
import HealthIcon from "@/assets/images/heart.png";
import StarIcon from "@/assets/images/star.png";
import DiamondIcon from "@/assets/images/diamond.png";
import ExperienceIcon from "@/assets/images/experience.png";
import LevelIcon from "@/assets/images/level.png";
import AccountIcon from "@/assets/images/account.png";

import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";

const cx = classNames.bind(styles);

UpdateItemDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	item: PropTypes.object,
};

UpdateItemDialog.defaultProps = {
	item: {},
};

// setVisible là 1 SetStateAction
// visible & item là các State
// Nên không cần dùng memo, useCallback, useMemo

function UpdateItemDialog({ visible, setVisible, item }) {
	return (
		<Dialog
			header="THAY ĐỔI CẤP ĐỘ NGƯỜI CHƠI"
			visible={visible}
			style={{ width: "50vw" }}
			onHide={() => setVisible(false)}
		>
			{ item && <h5>{item.id}</h5>}
		</Dialog>
	);
}

export default UpdateItemDialog;
