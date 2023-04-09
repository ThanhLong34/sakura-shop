import { useState, useCallback } from "react";

import ViewDialog from "./ViewDialog";
import TableData from "./TableData";

function Player() {
	//? States
	const [viewDialogVisible, setViewDialogVisible] = useState(false);

	//? Handles
	const handleView = useCallback((item) => {
		setViewDialogVisible(true);
		console.log(item);
	}, []);
	const handleDelete = useCallback((item) => {
		console.log(item);
	}, []);

	return (
		<div>
			<ViewDialog visible={viewDialogVisible} setVisible={setViewDialogVisible} />
			<div className="card">
				<TableData onView={handleView} onDelete={handleDelete} />
			</div>
		</div>
	);
}

export default Player;
