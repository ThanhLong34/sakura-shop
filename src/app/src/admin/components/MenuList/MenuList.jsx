import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./MenuList.module.scss";

import MenuItem from "@/admin/components/MenuItem";

const cx = classNames.bind(styles);

function MenuList() {
	return (
		<div className="layout-menu">
			<li className="layout-root-menuitem active-menuitem">
				<div className="layout-menuitem-root-text">Quản lý</div>
				<ul>
					<MenuItem icon="pi pi-fw pi-home" label="Dashboard" redirectTo="/admin/dashboard" />
					<MenuItem icon="pi pi-fw pi-image" label="Tệp hình ảnh" redirectTo="/admin/images" />
					<MenuItem icon="pi pi-fw pi-user" label="Người chơi" redirectTo="/admin/players" />
					<MenuItem icon="pi pi-fw pi-chart-line" label="Cấp độ" redirectTo="/admin/levels" />
					<MenuItem icon="pi pi-fw pi-gift" label="Phần quà" redirectTo="/admin/gifts" />
					<MenuItem icon="pi pi-fw pi-th-large" label="Chủ đề" redirectTo="/admin/topics" />
					<MenuItem icon="pi pi-fw pi-tablet" label="Thẻ bài" redirectTo="/admin/cards" />
					<MenuItem icon="pi pi-fw pi-question-circle" label="Câu hỏi" redirectTo="/admin/questions" />
					<MenuItem icon="pi pi-fw pi-bolt" label="Loại quảng cáo" redirectTo="/admin/advertisement-types" />
					<MenuItem icon="pi pi-fw pi-verified" label="Quảng cáo" redirectTo="/admin/advertisements" />
				</ul>
			</li>
			<li className="layout-root-menuitem active-menuitem">
				<div className="layout-menuitem-root-text">Tài khoản</div>
				<ul>
					<MenuItem icon="pi pi-fw pi-cog" label="Hồ sơ" redirectTo="/admin/profile" />
					<MenuItem icon="pi pi-fw pi-sign-in" label="Đăng xuất" redirectTo="/admin/logout" />
				</ul>
			</li>
		</div>
	);
}

export default MenuList;
