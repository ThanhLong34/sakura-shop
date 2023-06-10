import { useMemo, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Tooltip } from "primereact/tooltip";
import { Dock } from "primereact/dock";

import HouseIcon from "@/assets/images/dockIcons/House.png";
import ConsoleIcon from "@/assets/images/dockIcons/Console.png";
import GameboyIcon from "@/assets/images/dockIcons/Gameboy.png";
import GiftBoxIcon from "@/assets/images/dockIcons/GiftBox.png";
import ChocolateBoxIcon from "@/assets/images/dockIcons/ChocolateBox.png";
import SurveyIcon from "@/assets/images/dockIcons/Survey.png";
import UserIcon from "@/assets/images/dockIcons/User.png";

import { confirmDialog } from "primereact/confirmdialog";

function Navigator() {
	const navigate = useNavigate();
	const location = useLocation();

	//? Handles
	const navigateTo = useCallback(
		(to) => {
			navigate(to, {
				state: {
					prevRoute: location.pathname,
				},
			});
		},
		[location.pathname]
	);
	const checkChangeRouteFromGameplay = useCallback(() => {
		return location.pathname.includes("/gameplay");
	}, [location.pathname]);
	const confirmChangeRouteFromGameplay = useCallback(
		(acceptCallback = () => {}, rejectCallback = () => {}) => {
			confirmDialog({
				message: "Tất cả phần thưởng trong ván chơi này sẽ bị mất, bạn có muốn thoát không?",
				header: "Thoát khỏi ván chơi",
				icon: "pi pi-info-circle",
				position: "left",
				acceptLabel: "Đồng ý",
				rejectLabel: "Hủy",
				accept: acceptCallback,
				reject: rejectCallback,
			});
		},
		[location.pathname]
	);

	const items = useMemo(
		() => [
			{
				label: "Màn hình chính",
				icon: () => <img alt="Dashboard" src={HouseIcon} width="100%" />,
				command: (e) => {
					if (checkChangeRouteFromGameplay()) {
						confirmChangeRouteFromGameplay(() => {
							navigateTo("/dashboard");
						});
					} else {
						navigateTo("/dashboard");
					}
				},
			},
			{
				label: "Chế độ cổ điển",
				icon: () => <img alt="Classic mode" src={ConsoleIcon} width="100%" />,
				command: (e) => {
					if (checkChangeRouteFromGameplay()) {
						confirmChangeRouteFromGameplay(() => {
							navigateTo("/classic-mode");
						});
					} else {
						navigateTo("/classic-mode");
					}
				},
			},
			{
				label: "Chế độ tùy chọn",
				icon: () => <img alt="Optional mode" src={GameboyIcon} width="100%" />,
				command: (e) => {
					if (checkChangeRouteFromGameplay()) {
						confirmChangeRouteFromGameplay(() => {
							navigateTo("/optional-mode");
						});
					} else {
						navigateTo("/optional-mode");
					}
				},
			},
			{
				label: "Đổi thưởng",
				icon: () => <img alt="Reward" src={GiftBoxIcon} width="120%" />,
				command: (e) => {
					if (checkChangeRouteFromGameplay()) {
						confirmChangeRouteFromGameplay(() => {
							navigateTo("/reward");
						});
					} else {
						navigateTo("/reward");
					}
				},
			},
			{
				label: "Thu thập sức khỏe",
				icon: () => <img alt="Quiz and Ads" src={ChocolateBoxIcon} width="100%" />,
				command: (e) => {
					if (checkChangeRouteFromGameplay()) {
						confirmChangeRouteFromGameplay(() => {
							navigateTo("/quiz-and-ads");
						});
					} else {
						navigateTo("/quiz-and-ads");
					}
				},
			},
			{
				label: "Tham gia khảo sát",
				icon: () => <img alt="Survey" src={SurveyIcon} width="100%" />,
				command: (e) => {
					if (checkChangeRouteFromGameplay()) {
						confirmChangeRouteFromGameplay(() => {
							navigateTo("/survey");
						});
					} else {
						navigateTo("/survey");
					}
				},
			},
			{
				label: "Thông tin tài khoản",
				icon: () => <img alt="Profile" src={UserIcon} width="100%" />,
				command: (e) => {
					if (checkChangeRouteFromGameplay()) {
						confirmChangeRouteFromGameplay(() => {
							navigateTo("/profile");
						});
					} else {
						navigateTo("/profile");
					}
				},
			},
		],
		[navigateTo, checkChangeRouteFromGameplay, confirmChangeRouteFromGameplay, location.pathname]
	);

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
