import { useState } from "react";
import { Dialog } from "primereact/dialog";

function ViewDialog({ visible, setVisible }) {
	return (
		<Dialog
			header="Chi tiết tài khoản người chơi"
			visible={visible}
			style={{ width: "50vw" }}
			onHide={() => setVisible(false)}
		></Dialog>
	);
}

export default ViewDialog;
