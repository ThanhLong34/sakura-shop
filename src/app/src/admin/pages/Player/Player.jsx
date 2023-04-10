import { useState, useCallback } from "react";

import ViewDialog from "./ViewDialog";
import TableData from "./TableData";

function Player() {
	//? States
	const [viewDialogVisible, setViewDialogVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	//? Handles
	const handleView = useCallback((item) => {
		setViewDialogVisible(true);
		setSelectedItem(item);
	}, []);
	const handleDelete = useCallback((item) => {
		console.log(item);
		setSelectedItem(item);
	}, []);
	
	return (
		<div>
			<ViewDialog visible={viewDialogVisible} setVisible={setViewDialogVisible} item={selectedItem} />
			<div className="card">
				<TableData onView={handleView} onDelete={handleDelete} />
			</div>
		</div>
	);
}

export default Player;
