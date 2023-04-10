import { useState, useCallback } from "react";

import AddDialog from "./AddDialog";
import TableData from "./TableData";

function Level() {
	//? States
	const [addDialogVisible, setAddDialogVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	//? Handles
	const handleAddItem = useCallback(() => {
		setAddDialogVisible(true);
	}, []);
	const handleUpdateItem = useCallback((item) => {
		setAddDialogVisible(true);
		setSelectedItem(item);
	}, []);

	return (
		<div>
			<AddDialog visible={addDialogVisible} setVisible={setAddDialogVisible} item={selectedItem} />
			<div className="card">
				<TableData onOpenAddItemDialog={handleAddItem} onOpenUpdateItemDialog={handleUpdateItem} />
			</div>
		</div>
	);
}

export default Level;
