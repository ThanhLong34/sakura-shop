import { BrowserView, MobileView } from "react-device-detect";
import Mobile from "./mobile";
import Browser from "./browser";

function App() {
	return (
		<div className="App">
			{/* Browser */}
			<BrowserView>
				<Browser />
			</BrowserView>

			{/* Mobile */}
			<MobileView>
				<Mobile />
			</MobileView>
		</div>
	);
}

export default App;
