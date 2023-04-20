import { memo } from "react";
import classNames from "classnames/bind";
import styles from "./Navigator.module.scss";

import { Tooltip } from "primereact/tooltip";
import { Dock } from "primereact/dock";

import HouseIcon from "@/assets/images/dockIcons/House.png";
import ConsoleIcon from "@/assets/images/dockIcons/Console.png";
import GameboyIcon from "@/assets/images/dockIcons/Gameboy.png";
import GiftBoxIcon from "@/assets/images/dockIcons/GiftBox.png";
import QuizIcon from "@/assets/images/dockIcons/Quiz.png";
import AdsIcon from "@/assets/images/dockIcons/Ads.png";
import UserIcon from "@/assets/images/dockIcons/User.png";

const cx = classNames.bind(styles);

function Navigator() {
	const items = [
		{
			label: "Màn hình chính",
			icon: () => (
				<img alt="Dashboard" src={HouseIcon} width="100%" />
			),
			command: () => {
				//
			},
		},
		{
			label: "Chế độ cổ điển",
			icon: () => (
				<img alt="Basic mode" src={ConsoleIcon} width="100%" />
			),
			command: () => {
				//
			},
		},
		{
			label: "Chế độ tùy chọn",
			icon: () => (
				<img alt="Option mode" src={GameboyIcon} width="100%" />
			),
			command: () => {
				//
			},
		},
		{
			label: "Đổi thưởng",
			icon: () => (
				<img alt="Gift" src={GiftBoxIcon} width="100%" />
			),
			command: () => {
				//
			},
		},
		{
			label: "Trả lời câu hỏi",
			icon: () => (
				<img alt="Question" src={QuizIcon} width="100%" />
			),
			command: () => {
				//
			},
		},
		{
			label: "Xem quảng cáo",
			icon: () => (
				<img alt="Ads" src={AdsIcon} width="100%" />
			),
			command: () => {
				//
			},
		},
		{
			label: "Thông tin tài khoản",
			icon: () => (
				<img alt="Profile" src={UserIcon} width="100%" />
			),
			command: () => {
				//
			},
		},
	];

	// return (
	// 	<nav className={cx("navigator")}>
	// 		<NavLink
	// 			to="/"
	// 			className={ cx("link") }
	// 		>
	// 			Màn hình chính
	// 		</NavLink>
	// 		<NavLink
	// 			to="/admin/login"
	// 			className={cx("link")}
	// 		>
	// 			Đăng nhập Admin
	// 		</NavLink>
	// 	</nav>
	// );

	return (
		<>
			<Tooltip
				className="dark-tooltip"
				target=".dock-advanced .p-dock-action"
				my="center+15 bottom-15"
				at="center top"
				showDelay={0}
			/>
			<nav
				className="dock-window dock-advanced"
				style={{ backgroundImage: "url(https://primefaces.org/cdn/primereact/images/dock/window.jpg)" }}
			>
				<Dock model={items} position="left" />
			</nav>
		</>
	);
}

export default memo(Navigator);
