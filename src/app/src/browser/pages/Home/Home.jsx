import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import GameTitle from "@/assets/images/GameTitle.png";
import IconButton from "@/browser/components/IconButton/IconButton";
import GradientButton from "@/browser/components/GradientButton/GradientButton";

const cx = classNames.bind(styles);

function Home() {
	return (
		<div className="flex flex-column">
			<div className={cx("login-admin-button")}>
				<IconButton icon="pi pi-user" />
			</div>
			<div className="mt-6">
				<img className={cx("game-title")} src={GameTitle} alt="game title" />
			</div>
			<div className={cx("content", "card")}>
				<h3 className={cx("title")}>PHẦN THƯỞNG HẤP DẪN</h3>
				<div className={cx("image-wrapper")}>
					<img
						src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
						alt="content image"
					/>
					<img
						src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
						alt="content image"
					/>
					<img
						src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
						alt="content image"
					/>
					<img
						src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
						alt="content image"
					/>
					<img
						src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
						alt="content image"
					/>
					<img
						src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
						alt="content image"
					/>
				</div>
				<h3 className={cx("desc")}>
					Còn chần chừ gì nữa, <br /> nhanh tay chơi game săn quà nào bạn ơi!
				</h3>

				<div className="mt-3 grid">
					<div className="col-5">
						<GradientButton type="primary" className={cx("login-button")}>
							ĐĂNG NHẬP
						</GradientButton>
					</div>
					<div className="col-2">
						<span className={cx("text-divider")}>hoặc</span>
					</div>
					<div className="col-5">
						<GradientButton className={cx("register-button")}>ĐĂNG KÝ</GradientButton>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
