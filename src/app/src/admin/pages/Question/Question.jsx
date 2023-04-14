import { useState, useRef, useCallback } from "react";

import AddItemDialog from "./AddItemDialog";
import UpdateItemDialog from "./UpdateItemDialog";
import AnswerManagementDialog from "./AnswerManagementDialog";

import TableData from "./TableData";

function Question() {
	//? Refs
	const tableDataRef = useRef(null);

	//? States
	const [selectedItem, setSelectedItem] = useState(null);
	const [addItemDialogVisible, setAddItemDialogVisible] = useState(false);
	const [updateItemDialogVisible, setUpdateItemDialogVisible] = useState(false);
	const [answerManagementDialogVisible, setAnswerManagementDialogVisible] = useState(false);

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
			case "AnswerManagementDialog": {
				setAnswerManagementDialogVisible(true);
				setSelectedItem(payload);
				break;
			}
			default:
				break;
		}
	}, []);
	const handleRefreshPageTableData = useCallback(() => {
		tableDataRef.current.onRefreshPage();
	}, []);

	return (
		<div>
			<AddItemDialog
				visible={addItemDialogVisible}
				setVisible={setAddItemDialogVisible}
				onSubmitted={handleRefreshPageTableData}
			/>
			<UpdateItemDialog
				visible={updateItemDialogVisible}
				setVisible={setUpdateItemDialogVisible}
				item={selectedItem}
				onSubmitted={handleRefreshPageTableData}
			/>
			<AnswerManagementDialog
				visible={answerManagementDialogVisible}
				setVisible={setAnswerManagementDialogVisible}
				item={selectedItem}
			/>
			<div className="card">
				<TableData ref={tableDataRef} onOpenDialog={handleOpenDialog} />
			</div>
		</div>
	);
}

export default Question;
