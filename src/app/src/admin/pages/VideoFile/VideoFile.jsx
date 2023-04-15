import { useState, useCallback } from "react";

import PreviewImageDialog from "@/admin/components/PreviewImageDialog";
import TableData from "./TableData";

function ImageFile() {

	//? States
	const [previewImageUrl, setPreviewImageUrl] = useState(null);
	const [previewImageDialogVisible, setPreviewImageDialogVisible] = useState(false);

	//? Handles
	const handleOpenDialog = useCallback((type, payload) => {
		switch (type) {
			case "PreviewImageDialog": {
				setPreviewImageDialogVisible(true);
				setPreviewImageUrl(payload);
				break;
			}
			default:
				break;
		}
	}, []);

	return (
		<div>
			<PreviewImageDialog visible={previewImageDialogVisible} setVisible={setPreviewImageDialogVisible} url={previewImageUrl} />
			<div className="card">
				<TableData onOpenDialog={handleOpenDialog} />
			</div>
		</div>
	);
}

export default ImageFile;
