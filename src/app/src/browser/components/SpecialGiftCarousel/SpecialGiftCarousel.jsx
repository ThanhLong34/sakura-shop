import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./SpecialGiftCarousel.module.scss";

import giftApi from "@/apis/giftApi";

import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";

const cx = classNames.bind(styles);

function SpecialGiftCarousel() {
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
					starCost: +gift.starCost === 1,
					isSpecial: +gift.isSpecial === 1,
				}))
			)
		);
	}, []);

	const giftTemplate = (gift) => {
		return (
			<div className={cx('border-1 surface-border border-round m-2 text-center py-5 px-3', 'gift')}>
				<div className={cx('gift-image')}>
					<img src={gift.imageUrl} alt={gift.name} className="shadow-2" />
				</div>
				<div className="mt-4">
					<h4 className={cx('mb-3', 'gift-name')}>{gift.name}</h4>
					<Tag value="Mới nhất" severity="danger" />
					<div className="mt-3 flex flex-wrap gap-2 justify-content-center">
						<Button label="Xem" icon="pi pi-eye" severity="info" outlined />
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<Carousel
				value={gifts}
				numVisible={3}
				numScroll={3}
				responsiveOptions={responsiveOptions}
				className="custom-carousel"
				circular
				autoplayInterval={600000}
				itemTemplate={giftTemplate}
			/>
		</div>
	);
}

export default SpecialGiftCarousel;
