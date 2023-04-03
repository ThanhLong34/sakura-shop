import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

function App() {
	return (
		<div className="App">
			<h1>Welcome</h1>
			<BrowserView>
				<h1>This is rendered only in browser</h1>
			</BrowserView>
			<MobileView>
				<h1>This is rendered only on mobile</h1>
			</MobileView>
		</div>
	);
}

export default App;
