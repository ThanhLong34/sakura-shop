import PropTypes from "prop-types";

import { Dialog } from "primereact/dialog";

PreviewImageDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	url: PropTypes.string,
};

function PreviewImageDialog({ visible, setVisible, url }) {
	return (
		<Dialog visible={visible} style={{ width: "650px" }} onHide={() => setVisible(false)}>
			<video src={url} type="video/mp4" width="100%" height="100%" controls />
		</Dialog>
	);
}

export default PreviewImageDialog;
