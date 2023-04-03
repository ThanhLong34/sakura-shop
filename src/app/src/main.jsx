import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Styles
import "./assets/styles/reset.scss";
import "./assets/styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
