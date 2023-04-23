import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserView, MobileView } from "react-device-detect";
import Admin from "./admin";
import Browser from "./browser";
import Mobile from "./mobile";
import { ConfirmDialog } from "primereact/confirmdialog";

function App() {
	const adminAccount = useSelector((state) => state.admin.account);

	const BrowserViewRender = useMemo(() => {
		if (adminAccount) {
			return Admin;
		}
		return Browser;
	}, [adminAccount]);

	return (
		<div className="App">
			{/* 
				Đặt ConfirmDialog ở đây và không gọi lại ở đâu cả
				Tránh bị xuất hiện dialog 2 lần
			 */}
			<ConfirmDialog />

			{/* Browser */}
			<BrowserView>
				<BrowserViewRender />
			</BrowserView>

			{/* Mobile */}
			<MobileView>
				<Mobile />
			</MobileView>
		</div>
	);
}

export default App;
