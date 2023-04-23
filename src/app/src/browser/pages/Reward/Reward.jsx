import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Reward.module.scss";
import { updatePlayerAccountGameData } from "@/store/playerSlice";

import giftApi from "@/apis/giftApi";
import rewardApi from "@/apis/rewardApi";

import ViewGiftDialog from "@/browser/components/ViewGiftDialog";
import Gift from "@/browser/components/Gift";
import { confirmDialog } from "primereact/confirmdialog";

const cx = classNames.bind(styles);

function Reward() {
	const dispatch = useDispatch();
	const playerAccount = useSelector((state) => state.player.account);

	const [gifts, setGifts] = useState([]);
	const [selectedGift, setSelectedGift] = useState(null);
	const [viewGiftDialogVisible, setViewGiftDialogVisible] = useState(false);

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
	const handleOpenViewGiftDialog = useCallback((gift) => {
		setViewGiftDialogVisible(true);
		setSelectedGift(gift);
	}, []);
	const handleRewardExchange = useCallback(
		(gift) => {
			rewardApi
				.add({
					giftId: gift.id,
					playerId: playerAccount.id,
				})
				.then((response) => {
					if (response.code === 1) {
						confirmDialog({
							message: "Đổi phần thưởng thành công",
							header: "THÀNH CÔNG",
							icon: "pi pi-check",
							rejectLabel: "Đóng",
							acceptLabel: "Oke",
							acceptClassName: "p-button-success",
						});

						const gameData = {
							star: playerAccount.star - gift.starCost,
							diamond: playerAccount.diamond - gift.diamondCost,
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
						});
					}
				});
		},
		[playerAccount]
	);
	const confirmRewardExchange = useCallback((gift) => {
		confirmDialog({
			message: "Bạn có chắc chắn muốn đổi lấy phần thưởng này?",
			header: "XÁC NHẬN",
			icon: "pi pi-info-circle",
			acceptLabel: "Có",
			rejectLabel: "Hủy",
			accept: () => handleRewardExchange(gift),
		});
	}, [handleRewardExchange]);

	return (
		<>
			<ViewGiftDialog visible={viewGiftDialogVisible} setVisible={setViewGiftDialogVisible} item={selectedGift} />
			<div className={cx("wrapper", "card mb-2")}>
				<h5 className={cx("heading")}>Danh sách phần thưởng</h5>
				<div className={cx("gift-list", "grid")}>
					{gifts &&
						gifts.map((gift) => (
							<div className={cx("gift-item", "col-6 md:col-3")} key={gift.id}>
								<Gift
									gift={gift}
									onOpenViewGiftDialog={handleOpenViewGiftDialog}
									onRewardExchange={confirmRewardExchange}
								/>
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default Reward;
