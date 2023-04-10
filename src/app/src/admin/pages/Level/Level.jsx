import { useState, useCallback } from "react";

import AddItemDialog from "./AddItemDialog";
import UpdateItemDialog from "./UpdateItemDialog";
import TableData from "./TableData";

function Level() {
	//? States
	const [selectedItem, setSelectedItem] = useState(null);
	const [addItemDialogVisible, setAddItemDialogVisible] = useState(false);
	const [updateItemDialogVisible, setUpdateItemDialogVisible] = useState(false);

	//? Handles
	const handleOpenDialog = useCallback((type, payload) => {
		switch (type) {
			case "AddItemDialog": {
				setAddItemDialogVisible(true);
				break;
			}
			case "UpdateItemDialog": {
				setUpdateItemDialogVisible(true);
				setSelectedItem(payload);
				break;
			}
			default:
				break;
		}
	}, []);

	return (
		<div>
			<AddItemDialog visible={addItemDialogVisible} setVisible={setAddItemDialogVisible} />
			<UpdateItemDialog visible={updateItemDialogVisible} setVisible={setUpdateItemDialogVisible} item={selectedItem} />
			<div className="card">
				<TableData onOpenDialog={handleOpenDialog} />
			</div>
		</div>
	);
}

export default Level;
