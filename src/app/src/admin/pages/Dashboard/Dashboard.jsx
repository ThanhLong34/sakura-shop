import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import dashboardImage from "@/assets/images/dashboard.png";

const cx = classNames.bind(styles);

function Dashboard() {
	return (
		<div>
			<div className="grid">
				<div className="col-4">
					<div className={cx("card", "statistical", "player")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Người chơi</h6>
							<h6 className={cx("statistical-value")}>99</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-user" />
						</div>
					</div>
				</div>
				<div className="col-4">
					<div className={cx("card", "statistical", "gift")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Phần thưởng</h6>
							<h6 className={cx("statistical-value")}>999</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-gift" />
						</div>
					</div>
				</div>
				<div className="col-4">
					<div className={cx("card", "statistical", "card-s")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Thẻ bài</h6>
							<h6 className={cx("statistical-value")}>99</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-tablet" />
						</div>
					</div>
				</div>
				<div className="col-4">
					<div className={cx("card", "statistical", "topic")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Chủ đề</h6>
							<h6 className={cx("statistical-value")}>99</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-th-large" />
						</div>
					</div>
				</div>
				<div className="col-4">
					<div className={cx("card", "statistical", "question")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Câu hỏi</h6>
							<h6 className={cx("statistical-value")}>99</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-question-circle" />
						</div>
					</div>
				</div>
				<div className="col-4">
					<div className={cx("card", "statistical", "advertisement")}>
						<div className={cx("statistical-info")}>
							<h6 className={cx("statistical-title")}>Quảng cáo</h6>
							<h6 className={cx("statistical-value")}>99</h6>
						</div>
						<div className={cx("statistical-icon")}>
							<i className="pi pi-verified" />
						</div>
					</div>
				</div>
			</div>
			<div className="card mt-3">
				<div className="grid">
					<div className="col-7">
						<h1 className="mr-2">Chào mừng bạn đến với hệ thống quản trị</h1>
						<h3 className="mr-2">Chúc bạn một ngày mới tốt đẹp</h3>
					</div>
					<div className="col-5">
						<div>
							<img src={dashboardImage} alt="dashboard image" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
