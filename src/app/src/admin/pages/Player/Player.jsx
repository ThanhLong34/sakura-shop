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

	return (
		<div>
			<ViewDialog visible={viewDialogVisible} setVisible={setViewDialogVisible} item={selectedItem} />
			<div className="card">
				<TableData onView={handleView} />
			</div>
		</div>
	);
}

export default Player;
