import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Reward.module.scss";
import { updatePlayerAccountGameData } from "@/store/playerSlice";

import giftApi from "@/apis/giftApi";
import rewardApi from "@/apis/rewardApi";

import ViewGiftDialog from "@/browser/components/ViewGiftDialog";
import ViewRewardHistoryDialog from "./ViewRewardHistoryDialog";
import ConfirmRewardDialog from "./ConfirmRewardDialog";
import Gift from "@/browser/components/Gift";

import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

const cx = classNames.bind(styles);

function Reward() {
	const dispatch = useDispatch();
	const playerAccount = useSelector((state) => state.player.account);

	const [gifts, setGifts] = useState([]);
	const [selectedGift, setSelectedGift] = useState(null);
	const [viewGiftDialogVisible, setViewGiftDialogVisible] = useState(false);
	const [viewRewardHistoryDialogVisible, setViewRewardHistoryDialogVisible] = useState(false);
	const [confirmRewardDialogVisible, setConfirmRewardDialogVisible] = useState(false);

	useEffect(() => {
		giftApi.getAll().then((response) => {
			if (response.code === 1) {
				setGifts(
					response.data.map((gift) => ({
						...gift,
						id: +gift.id,
						starCost: +gift.starCost,
						diamondCost: +gift.diamondCost,
						isSpecial: +gift.isSpecial === 1,
					}))
				);
			}
		});
	}, []);

	//? Handles
	const handleOpenDialog = useCallback((type, payload) => {
		switch (type) {
			case "ViewGiftDialog": {
				setViewGiftDialogVisible(true);
				setSelectedGift(payload);
				break;
			}
			case "ViewRewardHistoryDialog": {
				setViewRewardHistoryDialogVisible(true);
				break;
			}
			case "ConfirmRewardDialogVisible": {
				setConfirmRewardDialogVisible(true);
				setSelectedGift(payload);
				break;
			}
			default:
				break;
		}
	}, []);
	const handleAcceptReward = useCallback(
		(rewardCode) => {
			if (selectedGift && rewardCode) {
				rewardApi
					.add({
						giftId: selectedGift.id,
						playerId: playerAccount.id,
						playerPhoneNumber: playerAccount.phoneNumber,
						invoiceRewardCode: rewardCode,
					})
					.then((response) => {
						if (response.code === 1) {
							setConfirmRewardDialogVisible(false);
							confirmDialog({
								message: "Đổi phần thưởng thành công",
								header: "THÀNH CÔNG",
								icon: "pi pi-check",
								rejectLabel: "Đóng",
								acceptLabel: "Oke",
								acceptClassName: "p-button-success",
								closable: false,
							});

							const gameData = {
								star: playerAccount.star - selectedGift.starCost,
								diamond: playerAccount.diamond - selectedGift.diamondCost,
							};
							const action = updatePlayerAccountGameData(gameData);

							dispatch(action);
						} else {
							confirmDialog({
								message: response.message,
								header: "THẤT BẠI",
								icon: "pi pi-times",
								rejectLabel: "Đóng",
								acceptLabel: "Đã hiểu",
								acceptClassName: "p-button-danger",
								closable: false,
							});
						}
					});
			}
		},
		[selectedGift, playerAccount]
	);
	const handleOpenConfirmRewardDialog = useCallback(
		(gift) => {
			if (playerAccount.star - gift.starCost < 0 || playerAccount.diamond - gift.diamondCost < 0) {
				confirmDialog({
					message: "Bạn không đủ sao hoặc kim cương để đổi lấy phần thưởng này",
					header: "ÔI KHÔNG",
					icon: "pi pi-times",
					rejectLabel: "Đóng",
					acceptLabel: "Đã hiểu",
					acceptClassName: "p-button-danger",
					closable: false,
				});
			} else {
				handleOpenDialog("ConfirmRewardDialogVisible", gift);
			}
		},
		[handleAcceptReward, playerAccount]
	);

	return (
		<>
			<ViewGiftDialog visible={viewGiftDialogVisible} setVisible={setViewGiftDialogVisible} item={selectedGift} />
			<ViewRewardHistoryDialog
				visible={viewRewardHistoryDialogVisible}
				setVisible={setViewRewardHistoryDialogVisible}
				playerAccount={playerAccount}
			/>
			<ConfirmRewardDialog
				visible={confirmRewardDialogVisible}
				setVisible={setConfirmRewardDialogVisible}
				onAccept={handleAcceptReward}
			/>
			<div className={cx("wrapper", "card")}>
				<div className="flex justify-content-center align-items-center mb-2">
					<h5 className={cx("heading", "flex-grow-1")}>Danh sách phần thưởng</h5>
					<Button
						className="ml-auto"
						label="Lịch sử đổi thưởng"
						icon="pi pi-book"
						severity="info"
						outlined
						onClick={() => handleOpenDialog("ViewRewardHistoryDialog")}
					/>
				</div>
				<div className={cx('note', 'mb-4')}>
					<p className={cx('note-heading')}>Lưu ý khi đổi thưởng:</p>
					<p className={cx('note-label')}>Các yêu cầu khi đổi thưởng:</p>
					<ul className={cx('note-list')}>
						<li>Bạn phải có đủ số sao hoặc kim cương</li>
						<li>Bạn phải mua ít nhất 1 sản phẩm từ cửa hàng để nhận được hóa đơn mua hàng</li>
						<li>Bạn phải có mã nhận thưởng từ hóa đơn mua hàng trong ngày</li>
						<li>Chỉ áp dụng đổi thưởng cùng với hóa đơn mua hàng trong ngày</li>
					</ul>
					<p className={cx('note-label')}>
						Đối với các phần thưởng cho phép nhận khi mua hàng online, đơn hàng của bạn phải được duyệt và thanh
						toán
					</p>
				</div>
				<div className={cx("gift-list", "grid")}>
					{gifts &&
						gifts.map((gift) => (
							<div className={cx("gift-item", "col-6 md:col-3")} key={gift.id}>
								<Gift
									gift={gift}
									onOpenViewGiftDialog={handleOpenDialog}
									onRewardExchange={handleOpenConfirmRewardDialog}
								/>
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default Reward;
