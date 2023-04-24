import { useState } from "react";
import PropTypes from "prop-types";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

ConfirmRewardDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	onAccept: PropTypes.func.isRequired,
};

ConfirmRewardDialog.defaultProps = {
	onAccept: () => {},
};

function ConfirmRewardDialog({ visible, setVisible, onAccept }) {
	const [rewardCode, setRewardCode] = useState("");

	const handleAccept = () => {
		onAccept(rewardCode);
	};

	return (
		<Dialog
			header="XÁC NHẬN ĐỔI THƯỞNG"
			visible={visible}
			style={{ width: "650px" }}
			onHide={() => setVisible(false)}
		>
			<p>
				Để đổi lấy phần thưởng này, bạn phải nhập mã đổi thưởng từ hóa đơn bạn mua trong ngày tại cửa hàng của chúng
				tôi vào bên dưới
			</p>
			<InputText value={rewardCode} onChange={(e) => setRewardCode(e.target.value)} />
			<div>
				<Button label="Hủy" outline />
				<Button label="Xác nhận" onClick={handleAccept} />
			</div>
		</Dialog>
	);
}

export default ConfirmRewardDialog;
