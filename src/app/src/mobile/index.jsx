import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Mobile() {
	return (
		<Router>
			<h1>This is rendered only on mobile</h1>
		</Router>
	);
}

export default Mobile;
