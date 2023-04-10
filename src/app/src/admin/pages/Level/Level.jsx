import { useState, useCallback } from "react";

import AddItemDialog from "./AddItemDialog";
import TableData from "./TableData";

function Level() {
	//? States
	const [selectedItem, setSelectedItem] = useState(null);
	const [addItemDialogVisible, setAddItemDialogVisible] = useState(false);

	//? Handles
	const handleOpenDialog = useCallback((type, payload) => {
		switch (type) {
			case "AddItemDialog": {
				setAddItemDialogVisible(true);
				break;
			}

			default:
				break;
		}
	}, []);

	return (
		<div>
			<AddItemDialog visible={addItemDialogVisible} setVisible={setAddItemDialogVisible} />
			<div className="card">
				<TableData onOpenDialog={handleOpenDialog} />
			</div>
		</div>
	);
}

export default Level;
