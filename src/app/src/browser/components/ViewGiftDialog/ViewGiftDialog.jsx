import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ViewGiftDialog.module.scss";

// Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import ExperienceIcon from "@/assets/images/ExperienceIcon.png";
import LevelIcon from "@/assets/images/LevelIcon.png";
import AccountIcon from "@/assets/images/AccountIcon.png";

import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";

const cx = classNames.bind(styles);

ViewGiftDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	item: PropTypes.object,
};

ViewGiftDialog.defaultProps = {
	item: {},
};

function ViewGiftDialog({ visible, setVisible, item }) {
	return (
		<Dialog
			header="CHI TIẾT PHẦN THƯỞNG"
			visible={visible}
			style={{ width: "650px" }}
			onHide={() => setVisible(false)}
		>
			{item && (
				<div>
					<div className="mb-3">
						<img src={item.imageUrl} alt="gift" />
					</div>
					{item.brand && (
						<div className="mb-3 flex justify-content-center">
							<Tag value={item.brand} severity="warning" />
						</div>
					)}
					<div className="mb-3">
						<p className={cx("gift-name")}>{item.name}</p>
					</div>
					<div className="mb-3">
						<p className={cx("gift-description")}>{item.description}</p>
					</div>
				</div>
			)}
		</Dialog>
	);
}

export default ViewGiftDialog;
