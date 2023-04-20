import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ViewItemDialog.module.scss";

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

function getSeverity(status) {
	switch (status) {
		case "Bị khóa":
			return "danger";
		case "Hoạt động":
			return "success";
	}
}

ViewItemDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	item: PropTypes.object,
};

ViewItemDialog.defaultProps = {
	item: {},
};

function ViewItemDialog({ visible, setVisible, item }) {
	let status;
	if (item) {
		status = item.lockedAt ? "Bị khóa" : "Hoạt động";
	}

	const statusDataTemplate = () => {
		return <Tag value={status} severity={getSeverity(status)} />;
	};

	return (
		<Dialog
			header="CHI TIẾT TÀI KHOẢN NGƯỜI CHƠI"
			visible={visible}
			style={{ width: "650px" }}
			onHide={() => setVisible(false)}
		>
			{item && (
				<div className="grid">
					<div className="col-6">
						<div className={cx("item-data")}>
							<span className={cx("item-icon", "pi pi-user")} />
							<span className={cx("item-value")}>{item.nickname}</span>
						</div>
						<div className={cx("item-data")}>
							<span className={cx("item-icon", "pi pi-phone")} />
							<span className={cx("item-value")}>{item.phoneNumber}</span>
						</div>
						<div className={cx("item-data")}>
							<span className={cx("item-icon", "pi pi-envelope")} />
							<span className={cx("item-value")}>{item.email}</span>
						</div>
						<div className="grid mt-2">
							<div className="col-4">
								<div className={cx("item-data-g", "flex")}>
									<span className="data-template">
										<img
											className={cx("item-icon", "data-template-icon")}
											src={HealthIcon}
											alt="health icon"
										/>
										<span className="data-template-value">{item.health}</span>
									</span>
								</div>
							</div>
							<div className="col-4">
								<div className={cx("item-data-g", "flex")}>
									<span className="data-template">
										<img className={cx("item-icon", "data-template-icon")} src={StarIcon} alt="star icon" />
										<span className="data-template-value">{item.star}</span>
									</span>
								</div>
							</div>
							<div className="col-4">
								<div className={cx("item-data-g", "flex")}>
									<span className="data-template">
										<img
											className={cx("item-icon", "data-template-icon")}
											src={DiamondIcon}
											alt="diamond icon"
										/>
										<span className="data-template-value">{item.diamond}</span>
									</span>
								</div>
							</div>
							<div className="col-4">
								<div className={cx("item-data-g", "flex")}>
									<span className="data-template">
										<img
											className={cx("item-icon", "data-template-icon")}
											src={ExperienceIcon}
											alt="experience icon"
										/>
										<span className="data-template-value">{item.experience}</span>
									</span>
								</div>
							</div>
							<div className="col-4">
								<div className={cx("item-data-g", "flex")}>
									<span className="data-template">
										<img className={cx("item-icon", "data-template-icon")} src={LevelIcon} alt="level icon" />
										<span className="data-template-value">{item.level}</span>
									</span>
								</div>
							</div>
						</div>
						<div className={cx("item-data")}>{status && statusDataTemplate()}</div>
					</div>
					<div className="col-6">
						<img className={cx("account-image")} src={AccountIcon} alt="account icon" />
					</div>
				</div>
			)}
		</Dialog>
	);
}

export default ViewItemDialog;
