import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import giftApi from "@/apis/giftApi";

import LogoBrand from "@/assets/images/LogoX250.png";
import GameTitleMobileImage from "@/assets/images/GameTitleMobile.png";

import { Button } from "primereact/button";

const cx = classNames.bind(styles);

function Home() {
	const [action, setAction] = useState("");
	const [gifts, setGifts] = useState([]);

	useEffect(() => {
		giftApi.getAll({ limit: 6, offset: 0, fillType: "isSpecial", fillValue: 1 }).then((response) =>
			setGifts(
				response.data.map((gift) => ({
					...gift,
					id: +gift.id,
					isSpecial: +gift.isSpecial === 1,
				}))
			)
		);
	}, []);

	return (
		<div className={cx("wrapper")}>
			<img className={cx("logo-brand")} src={LogoBrand} alt="logo brand" />
			<img className={cx("game-title")} src={GameTitleMobileImage} alt="game title" />
			<div className={cx("card mt-3", "content")}>
				<h3 className={cx("title")}>PHẦN THƯỞNG HẤP DẪN</h3>
				<div className={cx("image-wrapper")}>
					{gifts && gifts.map((gift) => <img key={gift.id} src={gift.imageUrl} alt="gift" />)}
				</div>
				<h3 className={cx("desc")}>
					Còn chần chừ gì nữa, <br /> nhanh tay chơi game săn quà nào bạn ơi!
				</h3>
				<div className="mt-1">
					<Button className="block w-full mb-2" label="ĐĂNG NHẬP" severity="primary" />
					<span className={cx("block w-full", "text-divider")}>hoặc</span>
					<Button className="block w-full mt-2" label="ĐĂNG KÝ" severity="danger" outlined />
				</div>
			</div>
		</div>
	);
}

export default Home;
