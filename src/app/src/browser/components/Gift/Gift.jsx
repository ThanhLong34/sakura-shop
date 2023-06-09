import { memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Gift.module.scss";
import { Button } from "primereact/button";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import { Tag } from "primereact/tag";

const cx = classNames.bind(styles);

Gift.propTypes = {
	gift: PropTypes.object.isRequired,
	onOpenViewGiftDialog: PropTypes.func,
	onRewardExchange: PropTypes.func,
};

Gift.defaultProps = {
	onOpenViewGiftDialog: () => {},
	onRewardExchange: () => {},
};

function Gift({ gift, onOpenViewGiftDialog, onRewardExchange }) {
	return (
		<div className={cx("wrapper")}>
			<img className={cx("image")} src={gift.imageUrl} alt={gift.name} />
			<div className={cx("info")}>
				<h4 className={cx("name")}>{gift.name}</h4>
				<div className={cx("cost-list")}>
					{gift.starCost > 0 && (
						<div className={cx("cost-item")}>
							<img className={cx("cost-icon")} src={StarIcon} alt="star" />
							<span className={cx("cost-value")}>{gift.starCost}</span>
						</div>
					)}
					{gift.diamondCost > 0 && (
						<div className={cx("cost-item")}>
							<img className={cx("cost-icon")} src={DiamondIcon} alt="diamond" />
							<span className={cx("cost-value")}>{gift.diamondCost}</span>
						</div>
					)}
				</div>
				{gift.isSpecial && (
					<div className={cx("tag")}>
						<Tag value="Đặc biệt" severity="danger" />
					</div>
				)}
				{gift.isPurchaseRequired && <p className={cx("purchase-required")}>Yêu cầu mua hàng</p>}
			</div>
			<div className={cx("action")}>
				<Button
					className="block mb-2 w-full"
					label="Xem chi tiết"
					icon="pi pi-eye"
					severity="info"
					outlined
					onClick={() => onOpenViewGiftDialog("ViewGiftDialog", gift)}
				/>
				<Button
					className="block w-full"
					label="Đổi thưởng"
					icon="pi pi-shopping-bag"
					severity="primary"
					onClick={() => onRewardExchange(gift)}
				/>
			</div>
		</div>
	);
}

export default memo(Gift);
