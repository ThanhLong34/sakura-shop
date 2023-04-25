import { useCallback, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Portrait.module.scss";
import Header from "@/mobile/components/Header";
import Sidebar from "@/mobile/components/Sidebar";

const cx = classNames.bind(styles);

function Portrait({ children }) {
	const [sidebarVisible, setSidebarVisible] = useState(false);

	const handleOpenSidebar = useCallback(() => {
		setSidebarVisible(true);
	}, []);

	return (
		<div className={cx("wrapper")}>
			<Header onOpenSidebar={handleOpenSidebar} />
			<Sidebar visible={sidebarVisible} setVisible={setSidebarVisible} />
			{children}
		</div>
	);
}

export default Portrait;
