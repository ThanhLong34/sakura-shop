import { useState, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";

import SpecialGiftCarousel from "@/browser/components/SpecialGiftCarousel";
import ViewGiftDialog from "@/browser/components/ViewGiftDialog";

const cx = classNames.bind(styles);

function Dashboard() {
	const [selectedGift, setSelectedGift] = useState(null);
	const [viewGiftDialogVisible, setViewGiftDialogVisible] = useState(false);

	const handleOpenViewGiftDialog = useCallback((payload) => {
		setViewGiftDialogVisible(true);
		setSelectedGift(payload);
	}, []);

	return (
		<>
			<ViewGiftDialog visible={viewGiftDialogVisible} setVisible={setViewGiftDialogVisible} item={selectedGift} />
			<div className={cx("dashboard")}>
				<div className="grid">
					<div className="col-12 md:col-12 lg:col-7">
						<div className="grid">
							<div className="col-12">
								<div className={cx("card")}>
									<h1 className={cx("game-title")}>
										Chào mừng bạn đến với trò chơi <br />
										<span>Lật Thẻ Tìm Son</span>
									</h1>
								</div>
							</div>
							<div className="col-12">
								<div className={cx("card background-transparent", "note")}>
									<h6 className={cx("note-title")}>Lưu ý:</h6>
									<p className={cx("note-text")}>
										Tất cả phần thưởng từ cửa hàng chỉ được phép đổi thưởng khi bạn mua hàng tại của hàng của
										chúng tôi. Bạn cần phải có đủ số sao hoặc kim cương để đổi thưởng.
									</p>
								</div>
							</div>
							<div className="col-12">
								<div className="card">
									<SpecialGiftCarousel onOpenViewGiftDialog={handleOpenViewGiftDialog} />
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 md:col-12 lg:col-5">
						<div className="card"></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
