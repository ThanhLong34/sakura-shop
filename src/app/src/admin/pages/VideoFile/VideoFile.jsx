import { useState, useCallback } from "react";

import PreviewVideoDialog from "@/admin/components/PreviewVideoDialog";
import TableData from "./TableData";

function VideoFile() {

	//? States
	const [previewImageUrl, setPreviewImageUrl] = useState(null);
	const [previewImageDialogVisible, setPreviewImageDialogVisible] = useState(false);

	//? Handles
	const handleOpenDialog = useCallback((type, payload) => {
		switch (type) {
			case "PreviewVideoDialog": {
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
			<PreviewVideoDialog visible={previewImageDialogVisible} setVisible={setPreviewImageDialogVisible} url={previewImageUrl} />
			<div className="card">
				<TableData onOpenDialog={handleOpenDialog} />
			</div>
		</div>
	);
}

export default VideoFile;
