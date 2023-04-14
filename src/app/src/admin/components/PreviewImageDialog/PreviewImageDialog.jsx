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
			<img src={url} alt="preview image" />
		</Dialog>
	);
}

export default PreviewImageDialog;
