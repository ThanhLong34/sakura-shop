import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import App from "./App";

// Prime React
import "primereact/resources/themes/soho-light/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css"; // styles primeflex

// Styles
import "./assets/styles/reset.scss";
import "./assets/styles/main.scss";

// Components
// import ScrollToTop from "./components/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				{/* <ScrollToTop /> */}
				<App />
			</Router>
		</Provider>
	</React.StrictMode>
);
