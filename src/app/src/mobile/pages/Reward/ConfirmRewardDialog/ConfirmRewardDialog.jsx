import { useState, useRef, memo } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

ConfirmRewardDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	onAccept: PropTypes.func.isRequired,
};

ConfirmRewardDialog.defaultProps = {
	onAccept: () => {},
};

function ConfirmRewardDialog({ visible, setVisible, onAccept }) {
	const toastRef = useRef(null);

	const [rewardCode, setRewardCode] = useState("");

	const handleAccept = () => {
		const _rewardCode = rewardCode.trim();

		if (!_rewardCode) {
			toastRef.current.show({
				severity: "error",
				summary: "Lỗi",
				detail: "Bạn chưa nhập mã đổi thưởng từ hóa đơn",
				life: 3000,
			});
			return;
		}

		onAccept(_rewardCode);
	};
	const handleCloseDialog = () => {
		setVisible(false);
	};
	const handleOpenDialog = () => {
		setRewardCode("");
	};

	return (
		<>
			{createPortal(<Toast ref={toastRef} position="top-center" />, document.body)}
			<Dialog
				header="XÁC NHẬN ĐỔI THƯỞNG"
				visible={visible}
				style={{ width: "650px" }}
				onHide={handleCloseDialog}
				onShow={handleOpenDialog}
			>
				<p>
					Để đổi lấy phần thưởng này, bạn phải nhập <span className="text-pink-500">mã đổi thưởng từ hóa đơn</span>{" "}
					bạn mua trong ngày tại cửa hàng của chúng tôi vào bên dưới
				</p>
				<InputText
					className="w-full mb-3 mt-3"
					placeholder="Nhập mã đổi thưởng từ hóa đơn"
					value={rewardCode}
					onChange={(e) => setRewardCode(e.target.value)}
				/>
				<div className="flex align-items-center justify-content-end">
					<Button className="mr-3" label="Hủy" outlined onClick={handleCloseDialog} />
					<Button label="Xác nhận" onClick={handleAccept} />
				</div>
			</Dialog>
		</>
	);
}

export default memo(ConfirmRewardDialog);
