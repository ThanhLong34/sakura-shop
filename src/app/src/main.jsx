import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Prime React
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core
import "primeicons/primeicons.css"; // icons                                        

// Styles
import "./assets/styles/reset.scss";
import "./assets/styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
