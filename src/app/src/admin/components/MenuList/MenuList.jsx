import { useDispatch } from "react-redux";
import { logoutAdminAccount } from "@/store/adminSlice";
import MenuItem from "@/admin/components/MenuItem";

function MenuList() {
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(logoutAdminAccount());
	}

	return (
		<div className="layout-menu">
			<li className="layout-root-menuitem active-menuitem">
				<div className="layout-menuitem-root-text">Quản lý</div>
				<ul>
					<MenuItem icon="pi pi-fw pi-home" label="Dashboard" redirectTo="/admin/dashboard" />
					<MenuItem icon="pi pi-fw pi-sliders-h" label="Quy ước trò chơi" redirectTo="/admin/game-convention" />
					<MenuItem icon="pi pi-fw pi-image" label="Tệp hình ảnh" redirectTo="/admin/image-file" />
					<MenuItem icon="pi pi-fw pi-video" label="Tệp video" redirectTo="/admin/video-file" />
					<MenuItem icon="pi pi-fw pi-user" label="Người chơi" redirectTo="/admin/player" />
					<MenuItem icon="pi pi-fw pi-chart-line" label="Cấp độ" redirectTo="/admin/level" />
					<MenuItem icon="pi pi-fw pi-gift" label="Phần thưởng" redirectTo="/admin/gift" />
					<MenuItem icon="pi pi-fw pi-th-large" label="Chủ đề" redirectTo="/admin/topic" />
					<MenuItem icon="pi pi-fw pi-tablet" label="Thẻ bài" redirectTo="/admin/card" />
					<MenuItem icon="pi pi-fw pi-question-circle" label="Câu hỏi" redirectTo="/admin/question" />
					<MenuItem icon="pi pi-fw pi-bolt" label="Loại quảng cáo" redirectTo="/admin/advertisement-type" />
					<MenuItem icon="pi pi-fw pi-verified" label="Quảng cáo" redirectTo="/admin/advertisement" />
					<MenuItem icon="pi pi-fw pi-file" label="Khảo sát" redirectTo="/admin/survey" />
				</ul>
			</li>
			<li className="layout-root-menuitem active-menuitem">
				<div className="layout-menuitem-root-text">Tài khoản</div>
				<ul>
					<MenuItem icon="pi pi-fw pi-cog" label="Hồ sơ" redirectTo="/admin/profile" />
					<MenuItem icon="pi pi-fw pi-sign-in" label="Đăng xuất" redirectTo="/admin/login" onClick={handleLogout} />
				</ul>
			</li>
		</div>
	);
}

export default MenuList;
