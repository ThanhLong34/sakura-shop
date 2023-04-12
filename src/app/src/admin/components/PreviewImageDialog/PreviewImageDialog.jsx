import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./PreviewImageDialog.module.scss";

import { Dialog } from "primereact/dialog";

const cx = classNames.bind(styles);

PreviewImageDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	item: PropTypes.string,
};

// setVisible là 1 SetStateAction
// visible & item là các State
// Nên không cần dùng memo, useCallback, useMemo

function PreviewImageDialog({ visible, setVisible, url }) {
	return (
		<Dialog
			visible={visible}
			style={{ width: "650px" }}
			onHide={() => setVisible(false)}
		>
			<div>
				<img src={url} alt="preview image" />
			</div>
		</Dialog>
	);
}

export default PreviewImageDialog;
