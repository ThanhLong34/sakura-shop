import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserView, MobileView } from "react-device-detect";
import Admin from "./admin";
import Browser from "./browser";
import Mobile from "./mobile";

function App() {
	const adminAccount = useSelector((state) => state.admin.account);
	const BrowserViewRendered = useMemo(() => {
		if (adminAccount) {
			return Admin;
		}
		return Browser;
	}, [adminAccount]);

	return (
		<div className="App">
			{/* Browser */}
			<BrowserView>
				<BrowserViewRendered />
			</BrowserView>

			{/* Mobile */}
			<MobileView>
				<Mobile />
			</MobileView>
		</div>
	);
}

export default App;
