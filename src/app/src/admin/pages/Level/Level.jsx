import { useState, useCallback } from "react";

// import ViewDialog from "./ViewDialog";
import TableData from "./TableData";

function Level() {
	//? States
	const [viewDialogVisible, setViewDialogVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	//? Handles
	const handleViewItem = useCallback((item) => {
		setViewDialogVisible(true);
		setSelectedItem(item);
	}, []);

	return (
		<div>
			{/* <ViewDialog visible={viewDialogVisible} setVisible={setViewDialogVisible} item={selectedItem} /> */}
			<div className="card">
				<TableData onViewItem={handleViewItem} />
			</div>
		</div>
	);
}

export default Level;
