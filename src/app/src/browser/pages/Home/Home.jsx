import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import GameTitle from "@/assets/images/GameTitle.png";
import IconButton from "@/browser/components/IconButton";
import GradientButton from "@/browser/components/GradientButton";
import LoginForm from "@/browser/components/LoginForm";
import RegisterForm from "@/browser/components/RegisterForm";

const cx = classNames.bind(styles);

function Home() {
	const [action, setAction] = useState(0);

	return (
		<div className="flex flex-column">
			<div className={cx("login-admin-button")}>
				<IconButton isRouteLink navigateTo="/admin/login" icon="pi pi-user" />
			</div>
			<div className="mt-4">
				<img className={cx("game-title")} src={GameTitle} alt="game title" />
			</div>
			<div className={cx("content", "card")}>
				{action === "ShowLoginForm" ? (
					<LoginForm />
				) : action === "ShowRegisterForm" ? (
					<RegisterForm />
				) : (
					<>
						<h3 className={cx("title")}>PHẦN THƯỞNG HẤP DẪN</h3>
						<div className={cx("image-wrapper")}>
							<img
								src="https://product.hstatic.net/1000025647/product/029_dior-min_56812b8e527f457488371480c0cfaa93_1024x1024.jpg"
								alt="gift image"
							/>
							<img
								src="https://product.hstatic.net/1000025647/product/giftset_gucci_flora_gorgeous_jasmine_edp___100ml___10ml___5ml_-min_c2d4301942d24cd1a67698c9a319b2a3_1024x1024.jpg"
								alt="gift image"
							/>
							<img
								src="https://product.hstatic.net/1000025647/product/1_e2f5c4830778465eac4c871582ee6a92_large_f1702ea67a2d43b5ba3df7e0f9e0aa81_1024x1024.jpg"
								alt="gift image"
							/>
							<img
								src="https://product.hstatic.net/1000025647/product/ior-rouge-mitzah-velvet-999__2__6b0f64a40b534f978c39c91a6b6ca8d7_large_2f729541d84f4772b7030876aebad614_1024x1024.png"
								alt="gift image"
							/>
							<img
								src="https://product.hstatic.net/1000025647/product/nuoc_hoa_ysl_black_opium_le_parfum_50ml__-_nong_nang__goi_cam__2__eb867434f8904198a78fe31f50cd817e_1024x1024.jpg"
								alt="gift image"
							/>
							<img
								src="https://product.hstatic.net/1000025647/product/bleu_de_chanel_edt_150ml_aa05e910eece486299be921d45ffed57_1024x1024.png"
								alt="gift image"
							/>
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
					</>
				)}
			</div>
		</div>
	);
}

export default Home;
