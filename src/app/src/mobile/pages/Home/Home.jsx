import { useCallback, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import giftApi from "@/apis/giftApi";

import LogoBrand from "@/assets/images/LogoX250.png";
import GameTitleMobileImage from "@/assets/images/GameTitleMobile.png";

import { Button } from "primereact/button";
import LoginForm from "@/mobile/components/LoginForm";
import RegisterForm from "@/mobile/components/RegisterForm";

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

	const handleGoBack = useCallback(() => {
		setAction("");
	}, []);
	const handleShowLoginForm = useCallback(() => {
		setAction("ShowLoginForm");
	}, []);
	const handleShowRegisterForm = useCallback(() => {
		setAction("ShowRegisterForm");
	}, []);

	return (
		<div className={cx("wrapper")}>
			<img className={cx("logo-brand")} src={LogoBrand} alt="logo brand" />
			<img className={cx("game-title")} src={GameTitleMobileImage} alt="game title" />
			<div className={cx("card mt-3", "content")}>
				{action === "ShowLoginForm" ? (
					<LoginForm onGoBack={handleGoBack} />
				) : action === "ShowRegisterForm" ? (
					<RegisterForm onGoBack={handleGoBack} />
				) : (
					<>
						<h3 className={cx("title", "mb-3")}>PHẦN THƯỞNG HẤP DẪN</h3>
						<div className={cx("image-wrapper", "mb-3")}>
							{gifts && gifts.map((gift) => <img key={gift.id} src={gift.imageUrl} alt="gift" />)}
						</div>
						<h3 className={cx("desc", "mb-3")}>
							Còn chần chừ gì nữa, <br /> nhanh tay chơi game săn quà nào bạn ơi!
						</h3>
						<Button
							className="block w-full mb-2"
							label="Đăng nhập"
							severity="primary"
							onClick={handleShowLoginForm}
						/>
						<span className={cx("block w-full", "text-divider")}>hoặc</span>
						<Button
							className="block w-full mt-2"
							label="Đăng ký"
							severity="warning"
							onClick={handleShowRegisterForm}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default Home;
