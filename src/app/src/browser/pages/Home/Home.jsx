import { useCallback, useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import giftApi from "@/apis/giftApi";

import GameTitle from "@/assets/images/GameTitle.png";
import IconButton from "@/browser/components/IconButton";
import GradientButton from "@/browser/components/GradientButton";
import LoginForm from "@/browser/components/LoginForm";
import RegisterForm from "@/browser/components/RegisterForm";
import BrandLogo from "@/browser/components/BrandLogo";

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
		<div className="flex flex-column">
			<BrandLogo />
			<div className={cx("login-admin-button")}>
				<IconButton isRouteLink navigateTo="/admin/login" icon="pi pi-user" />
			</div>
			<div className="mt-4">
				<img className={cx("game-title")} src={GameTitle} alt="game title" />
			</div>
			<div className={cx("content", "card")}>
				{action === "ShowLoginForm" ? (
					<LoginForm onGoBack={handleGoBack} onShowRegisterForm={handleShowRegisterForm} />
				) : action === "ShowRegisterForm" ? (
					<RegisterForm onGoBack={handleGoBack} onShowLoginForm={handleShowLoginForm} />
				) : (
					<div className="zoomin animation-duration-500 animation-iteration-1 animation-ease-out">
						<h3 className={cx("title")}>PHẦN THƯỞNG HẤP DẪN</h3>
						<div className={cx("image-wrapper")}>
							{gifts && gifts.map((gift) => <img key={gift.id} src={gift.imageUrl} alt="gift" />)}
						</div>
						<h3 className={cx("desc")}>
							Còn chần chừ gì nữa, <br /> nhanh tay chơi game săn quà nào bạn ơi!
						</h3>
						<div className="mt-1 grid">
							<div className="col-5">
								<GradientButton
									type="primary"
									className={cx("login-button")}
									onClick={() => setAction("ShowLoginForm")}
								>
									ĐĂNG NHẬP
								</GradientButton>
							</div>
							<div className="col-2">
								<span className={cx("text-divider")}>hoặc</span>
							</div>
							<div className="col-5">
								<GradientButton className={cx("register-button")} onClick={() => setAction("ShowRegisterForm")}>
									ĐĂNG KÝ
								</GradientButton>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
