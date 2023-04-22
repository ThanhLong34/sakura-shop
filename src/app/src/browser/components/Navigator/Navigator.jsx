import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Tooltip } from "primereact/tooltip";
import { Dock } from "primereact/dock";

import HouseIcon from "@/assets/images/dockIcons/House.png";
import ConsoleIcon from "@/assets/images/dockIcons/Console.png";
import GameboyIcon from "@/assets/images/dockIcons/Gameboy.png";
import GiftBoxIcon from "@/assets/images/dockIcons/GiftBox.png";
import ChocolateBoxIcon from "@/assets/images/dockIcons/ChocolateBox.png";
import UserIcon from "@/assets/images/dockIcons/User.png";

function Navigator() {
	const navigate = useNavigate();

	const items = [
		{
			label: "Màn hình chính",
			icon: () => <img alt="Dashboard" src={HouseIcon} width="100%" />,
			command: (e) => {
				navigate("/dashboard");
			},
		},
		{
			label: "Chế độ cổ điển",
			icon: () => <img alt="Classic mode" src={ConsoleIcon} width="100%" />,
			command: (e) => {
				navigate("/classic-mode");
			},
		},
		{
			label: "Chế độ tùy chọn",
			icon: () => <img alt="Optional mode" src={GameboyIcon} width="100%" />,
			command: (e) => {
				navigate("/optional-mode");
			},
		},
		{
			label: "Đổi thưởng",
			icon: () => <img alt="Gift" src={GiftBoxIcon} width="120%" />,
			command: (e) => {
				navigate("/gift");
			},
		},
		{
			label: "Thu thập sức khỏe",
			icon: () => <img alt="Collect health" src={ChocolateBoxIcon} width="100%" />,
			command: (e) => {
				navigate("/collect-health");
			},
		},
		{
			label: "Thông tin tài khoản",
			icon: () => <img alt="Profile" src={UserIcon} width="100%" />,
			command: (e) => {
				navigate("/profile");
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
