import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";

import SpecialGiftCarousel from "@/browser/components/SpecialGiftCarousel";
import ViewGiftDialog from "@/browser/components/ViewGiftDialog";

import ConsoleIcon from "@/assets/images/dockIcons/Console.png";
import GameboyIcon from "@/assets/images/dockIcons/Gameboy.png";

const cx = classNames.bind(styles);

function Dashboard() {
	const [selectedGift, setSelectedGift] = useState(null);
	const [viewGiftDialogVisible, setViewGiftDialogVisible] = useState(false);

	const handleOpenViewGiftDialog = useCallback((gift) => {
		setViewGiftDialogVisible(true);
		setSelectedGift(gift);
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
										Có một số phần thưởng yêu cầu bạn phải mua hàng tại cửa hàng của
										chúng tôi và bạn cần phải có đủ số sao hoặc kim cương để đổi thưởng.
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
						<div className={cx("card", "mode")}>
							<h6 className={cx("mode-title")}>Chọn chế độ chơi</h6>
							<Link to="/classic-mode">
								<div className={cx("mode-item", "mb-3")}>
									<img className={cx("mode-image")} src={ConsoleIcon} alt="console" />
									<div className={cx("mode-info")}>
										<h6 className={cx("mode-name")}>Chế độ cổ điển</h6>
										<p className={cx("mode-desc")}>
											Trong chế độ này, người chơi được chọn 1 trong 3 cấp độ sau:
										</p>
										<ul>
											<li>Dễ: 12 thẻ bài</li>
											<li>Trung bình: 16 thẻ bài</li>
											<li>Khó: 20 thẻ bài</li>
										</ul>
									</div>
								</div>
							</Link>
							<Link to="/optional-mode">
								<div className={cx("mode-item", "mb-3")}>
									<img className={cx("mode-image")} src={GameboyIcon} alt="game boy" />
									<div className={cx("mode-info")}>
										<h6 className={cx("mode-name")}>Chế độ tùy chọn</h6>
										<p className={cx("mode-desc")}>
											Trong chế độ này, người chơi được chọn 1 trong các chủ đề yêu thích
										</p>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
