import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Tooltip } from "primereact/tooltip";
import { Dock } from "primereact/dock";

import HouseIcon from "@/assets/images/dockIcons/House.png";
import ConsoleIcon from "@/assets/images/dockIcons/Console.png";
import GameboyIcon from "@/assets/images/dockIcons/Gameboy.png";
import GiftBoxIcon from "@/assets/images/dockIcons/GiftBox.png";
import QuizIcon from "@/assets/images/dockIcons/Quiz.png";
import AdsIcon from "@/assets/images/dockIcons/Ads.png";
import UserIcon from "@/assets/images/dockIcons/User.png";

function Navigator() {
	const navigator = useNavigate();

	const items = [
		{
			label: "Màn hình chính",
			icon: () => (
				<img alt="Dashboard" src={HouseIcon} width="100%" />
			),
			command: (e) => {
				navigator('/dashboard');
			},
		},
		{
			label: "Chế độ cổ điển",
			icon: () => (
				<img alt="Classic mode" src={ConsoleIcon} width="100%" />
			),
			command: (e) => {
				navigator('/classic-mode');
			},
		},
		{
			label: "Chế độ tùy chọn",
			icon: () => (
				<img alt="Optional mode" src={GameboyIcon} width="100%" />
			),
			command: (e) => {
				navigator('/optional-mode');
			},
		},
		{
			label: "Đổi thưởng",
			icon: () => (
				<img alt="Gift" src={GiftBoxIcon} width="100%" />
			),
			command: (e) => {
				navigator('/gift');
			},
		},
		{
			label: "Trả lời câu hỏi",
			icon: () => (
				<img alt="Question" src={QuizIcon} width="100%" />
			),
			command: (e) => {
				navigator('/question');
			},
		},
		{
			label: "Xem quảng cáo",
			icon: () => (
				<img alt="Ads" src={AdsIcon} width="100%" />
			),
			command: (e) => {
				navigator('/ads');
			},
		},
		{
			label: "Thông tin tài khoản",
			icon: () => (
				<img alt="Profile" src={UserIcon} width="100%" />
			),
			command: (e) => {
				navigator('/profile');
			},
		},
	];

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
