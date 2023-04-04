import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./MenuList.module.scss";

import MenuItem from "@/admin/components/MenuItem";

const cx = classNames.bind(styles);

function MenuList() {
	return (
		<div className="layout-menu">
			<ul>
				<MenuItem icon="pi pi-fw pi-home" label="Dashboard" />
				<MenuItem icon="pi pi-fw pi-image" label="Tệp hình ảnh" />
				<MenuItem icon="pi pi-fw pi-user" label="Người chơi" />
				<MenuItem icon="pi pi-fw pi-chart-line" label="Cấp độ" />
				<MenuItem icon="pi pi-fw pi-gift" label="Phần quà" />
				<MenuItem icon="pi pi-fw pi-th-large" label="Chủ đề" />
				<MenuItem icon="pi pi-fw pi-tablet" label="Thẻ bài" />
				<MenuItem icon="pi pi-fw pi-question-circle" label="Câu hỏi" />
				<MenuItem icon="pi pi-fw pi-bolt" label="Loại quảng cáo" />
				<MenuItem icon="pi pi-fw pi-verified" label="Quảng cáo" />
			</ul>
		</div>
	);
}

export default MenuList;
