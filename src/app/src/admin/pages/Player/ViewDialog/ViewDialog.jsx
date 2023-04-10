import PropTypes from "prop-types";

// Icons
import HealthIcon from "@/assets/images/heart.png";
import StarIcon from "@/assets/images/star.png";
import DiamondIcon from "@/assets/images/diamond.png";
import ExperienceIcon from "@/assets/images/experience.png";
import LevelIcon from "@/assets/images/level.png";

import { Dialog } from "primereact/dialog";

ViewDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	item: PropTypes.object,
};

ViewDialog.defaultProps = {
	item: {},
};

// setVisible là 1 SetStateAction
// visible & item là các State
// Nên không cần dùng memo, useCallback, useMemo

function ViewDialog({ visible, setVisible, item }) {
	console.log('viewdialog');

	return (
		<Dialog
			header="CHI TIẾT TÀI KHOẢN NGƯỜI CHƠI"
			visible={visible}
			style={{ width: "50vw" }}
			onHide={() => setVisible(false)}
		>
			{item && (
				<>
					<div className="mb-3">
						<span className="font-bold mr-1">Tên người chơi:</span>
						<span className="text-primary">{item.nickname}</span>
					</div>
					<div className="mb-3">
						<span className="font-bold mr-1">Số điện thoại:</span>
						<span className="text-primary">{item.phoneNumber}</span>
					</div>
					<div className="mb-3">
						<span className="font-bold mr-1">Email:</span>
						<span className="text-primary">{item.email}</span>
					</div>
					<div className="mb-3 flex">
						<span className="font-bold mr-1">Sức khỏe:</span>
						<span className="data-template">
							<span className="data-template-value text-primary">{item.health}</span>
							<img className="data-template-icon" src={HealthIcon} alt="health icon" />
						</span>
					</div>
				</>
			)}
		</Dialog>
	);
}

export default ViewDialog;
