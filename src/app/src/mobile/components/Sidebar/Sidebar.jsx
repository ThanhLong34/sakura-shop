import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { logoutPlayerAccount } from "@/store/playerSlice";

import { Sidebar as SidebarPrimeReact } from "primereact/sidebar";
import { confirmDialog } from "primereact/confirmdialog";

const cx = classNames.bind(styles);

Sidebar.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
};

function Sidebar({ visible, setVisible }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	//? Functions
	const navigateTo = useCallback(
		(to) => {
			navigate(to, {
				state: {
					prevRoute: location.pathname,
				},
			});
			setVisible(false);
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

	//? Handles
	const handleLogout = () => {
		dispatch(logoutPlayerAccount());
		navigate("/");
	};
	const handleOpenLogoutDialog = () => {
		confirmDialog({
			message: "Bạn có muốn đăng xuất không?",
			header: "Xác nhận",
			icon: "pi pi-exclamation-triangle",
			acceptLabel: "Có",
			rejectLabel: "Hủy",
			acceptClassName: "p-button-danger",
			accept: handleLogout,
		});
	};

	return (
		<SidebarPrimeReact visible={visible} onHide={() => setVisible(false)}>
			<h2 className={cx("heading")}>Menu</h2>
			<span className={cx("divider")}>
				<span></span>
			</span>
			<ul className={cx("menu-list")}>
				<li
					className={cx("menu-item", {
						active: location.pathname === "/dashboard",
					})}
					onClick={() => {
						if (checkChangeRouteFromGameplay()) {
							confirmChangeRouteFromGameplay(() => {
								navigateTo("/dashboard");
							});
						} else {
							navigateTo("/dashboard");
						}
					}}
				>
					<i className="pi pi-home"></i>
					<span>Màn hình chính</span>
				</li>
				<li
					className={cx("menu-item", {
						active: location.pathname === "/classic-mode",
					})}
					onClick={() => {
						if (checkChangeRouteFromGameplay()) {
							confirmChangeRouteFromGameplay(() => {
								navigateTo("/classic-mode");
							});
						} else {
							navigateTo("/classic-mode");
						}
					}}
				>
					<i className="pi pi-sitemap"></i>
					<span>Chơi cổ điển</span>
				</li>
				<li
					className={cx("menu-item", {
						active: location.pathname === "/optional-mode",
					})}
					onClick={() => {
						if (checkChangeRouteFromGameplay()) {
							confirmChangeRouteFromGameplay(() => {
								navigateTo("/optional-mode");
							});
						} else {
							navigateTo("/optional-mode");
						}
					}}
				>
					<i className="pi pi-th-large"></i>
					<span>Chơi tùy chọn</span>
				</li>
				<li
					className={cx("menu-item", {
						active: location.pathname === "/reward",
					})}
					onClick={() => {
						if (checkChangeRouteFromGameplay()) {
							confirmChangeRouteFromGameplay(() => {
								navigateTo("/reward");
							});
						} else {
							navigateTo("/reward");
						}
					}}
				>
					<i className="pi pi-gift"></i>
					<span>Đổi thưởng</span>
				</li>
				<li
					className={cx("menu-item", {
						active: location.pathname === "/reward-history",
					})}
					onClick={() => {
						if (checkChangeRouteFromGameplay()) {
							confirmChangeRouteFromGameplay(() => {
								navigateTo("/reward-history");
							});
						} else {
							navigateTo("/reward-history");
						}
					}}
				>
					<i className="pi pi-book"></i>
					<span>Lịch sử đổi thưởng</span>
				</li>
				<li
					className={cx("menu-item", {
						active: location.pathname === "/quiz-and-ads",
					})}
					onClick={() => {
						if (checkChangeRouteFromGameplay()) {
							confirmChangeRouteFromGameplay(() => {
								navigateTo("/quiz-and-ads");
							});
						} else {
							navigateTo("/quiz-and-ads");
						}
					}}
				>
					<i className="pi pi-heart"></i>
					<span>Thu thập sức khỏe</span>
				</li>
				<li
					className={cx("menu-item", {
						active: location.pathname === "/survey",
					})}
					onClick={() => {
						if (checkChangeRouteFromGameplay()) {
							confirmChangeRouteFromGameplay(() => {
								navigateTo("/survey");
							});
						} else {
							navigateTo("/survey");
						}
					}}
				>
					<i className="pi pi-file"></i>
					<span>Tham gia khảo sát</span>
				</li>
				<li
					className={cx("menu-item", {
						active: location.pathname === "/profile",
					})}
					onClick={() => {
						if (checkChangeRouteFromGameplay()) {
							confirmChangeRouteFromGameplay(() => {
								navigateTo("/profile");
							});
						} else {
							navigateTo("/profile");
						}
					}}
				>
					<i className="pi pi-user"></i>
					<span>Tài khoản</span>
				</li>
				<li className={cx("menu-item", "text-red-500")} onClick={handleOpenLogoutDialog}>
					<i className="pi pi-sign-out"></i>
					<span>Đăng xuất</span>
				</li>
			</ul>
		</SidebarPrimeReact>
	);
}

export default memo(Sidebar);
