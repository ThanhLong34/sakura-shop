import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AddItemDialog.module.scss";

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

AddItemDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
};

// setVisible là 1 SetStateAction
// visible & item là các State
// Nên không cần dùng memo, useCallback, useMemo

function AddItemDialog({ visible, setVisible }) {
	return (
		<Dialog
			header="THÊM CẤP ĐỘ NGƯỜI CHƠI"
			visible={visible}
			style={{ width: "50vw" }}
			onHide={() => setVisible(false)}
		>
			
		</Dialog>
	);
}

export default AddItemDialog;
