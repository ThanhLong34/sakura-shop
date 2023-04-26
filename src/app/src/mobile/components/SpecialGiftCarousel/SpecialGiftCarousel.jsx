import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SpecialGiftCarousel.module.scss";

import giftApi from "@/apis/giftApi";

import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";

const cx = classNames.bind(styles);

SpecialGiftCarousel.propTypes = {
	onOpenViewGiftDialog: PropTypes.func,
};

SpecialGiftCarousel.defaultProps = {
	onOpenViewGiftDialog: () => {},
};

function SpecialGiftCarousel({ onOpenViewGiftDialog }) {
	const [gifts, setGifts] = useState([]);

	const responsiveOptions = [
		{
			breakpoint: "1199px",
			numVisible: 1,
			numScroll: 1,
		},
		{
			breakpoint: "991px",
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: "767px",
			numVisible: 1,
			numScroll: 1,
		},
	];

	useEffect(() => {
		giftApi.getAll({ limit: 6, offset: 0, fillType: "isSpecial", fillValue: 1 }).then((response) =>
			setGifts(
				response.data.map((gift) => ({
					...gift,
					id: +gift.id,
					starCost: +gift.starCost,
					diamondCost: +gift.diamondCost,
					isSpecial: +gift.isSpecial === 1,
				}))
			)
		);
	}, []);

	const giftTemplate = (gift) => {
		return (
			<div className={cx("border-1 surface-border border-round m-2 text-center py-5 px-3", "gift")}>
				<div className={cx("gift-image")}>
					<img src={gift.imageUrl} alt={gift.name} className="shadow-2" />
				</div>
				<div className="mt-3">
					<h4 className={cx("mb-2", "gift-name")}>{gift.name}</h4>
					{gift.isSpecial && <Tag value="Đặc biệt" severity="danger" />}
				</div>
				<div className={cx("mt-3", "gift-action")}>
					<Button
						label="Xem"
						icon="pi pi-eye"
						severity="info"
						outlined
						onClick={() => onOpenViewGiftDialog(gift)}
					/>
				</div>
			</div>
		);
	};

	return (
		<div>
			<h5 className={cx("title", "mb-2")}>Phần thưởng hấp dẫn</h5>
			<Carousel
				value={gifts}
				numVisible={3}
				numScroll={3}
				responsiveOptions={responsiveOptions}
				className="custom-carousel"
				circular
				autoplayInterval={3000}
				itemTemplate={giftTemplate}
			/>
		</div>
	);
}

export default memo(SpecialGiftCarousel);
