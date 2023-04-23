import { memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Gift.module.scss";
import { Button } from "primereact/button";

const cx = classNames.bind(styles);

Gift.propTypes = {
	gift: PropTypes.object.isRequired,
	onOpenViewGiftDialog: PropTypes.func,
};

Gift.defaultProps = {
	onOpenViewGiftDialog: () => {},
};

function Gift({ gift, onOpenViewGiftDialog }) {
	return (
		<div className={cx("border-1 surface-border border-round m-2 text-center py-5 px-3", "gift")}>
			<div className={cx("gift-image")}>
				<img src={gift.imageUrl} alt={gift.name} className="shadow-2" />
			</div>
			<div className="mt-4">
				<h4 className={cx("mb-3", "gift-name")}>{gift.name}</h4>
				<div className="mt-3 flex flex-wrap gap-2 justify-content-center">
					<Button
						label="Xem"
						icon="pi pi-eye"
						severity="info"
						outlined
						onClick={() => onOpenViewGiftDialog(gift)}
					/>
				</div>
			</div>
		</div>
	);
}

export default memo(Gift);
