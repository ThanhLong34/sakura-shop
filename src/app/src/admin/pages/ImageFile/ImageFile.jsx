import { useState, useRef, useCallback } from "react";

import PreviewImageDialog from "@/admin/components/PreviewImageDialog";
import TableData from "./TableData";

function ImageFile() {
	//? Refs
	const tableDataRef = useRef(null);

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
				<TableData ref={tableDataRef} onOpenDialog={handleOpenDialog} />
			</div>
		</div>
	);
}

export default ImageFile;
