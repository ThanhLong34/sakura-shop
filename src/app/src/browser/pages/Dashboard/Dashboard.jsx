import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";

import SpecialGiftCarousel from "@/browser/components/SpecialGiftCarousel";

const cx = classNames.bind(styles);

function Dashboard() {

	return (
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
								<SpecialGiftCarousel />
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 md:col-12 lg:col-5">
					<div className="card"></div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
