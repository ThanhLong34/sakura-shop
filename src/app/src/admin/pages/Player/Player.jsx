import { useState, useCallback } from "react";

import ViewItemDialog from "./ViewItemDialog";
import TableData from "./TableData";

function Player() {
	//? States
	const [selectedItem, setSelectedItem] = useState(null);
	const [viewItemDialogVisible, setViewItemDialogVisible] = useState(false);

	//? Handles
	const handleOpenDialog = useCallback((type, payload) => {
		switch (type) {
			case "ViewItemDialog": {
				setViewItemDialogVisible(true);
				setSelectedItem(payload);
				break;
			}
			default:
				break;
		}
	}, []);

	return (
		<div>
			<ViewItemDialog visible={viewItemDialogVisible} setVisible={setViewItemDialogVisible} item={selectedItem} />
			<div className="card">
				<TableData onOpenDialog={handleOpenDialog} />
			</div>
		</div>
	);
}

export default Player;
