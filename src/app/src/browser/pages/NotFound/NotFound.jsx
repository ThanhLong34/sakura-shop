import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
import GradientButton from "@/browser/components/GradientButton";
import PageNotFoundAdmin from "@/assets/images/PageNotFoundAdmin.png";

const cx = classNames.bind(styles);

function NotFound() {
	const navigate = useNavigate();

	return (
		<div className={cx("wrapper")}>
			<div className={cx("card", "not-found")}>
				<img className={cx("image")} src={PageNotFoundAdmin} alt="page not found" />
				<h6 className={cx("heading")}>
					Hmmm, có gì đó sai sai ở đây
					<br />
					Trang mà bạn muốn tới không tồn tại
				</h6>
				<GradientButton className="mb-2" type="secondary" onClick={() => navigate("/")}>
					Quay lại trang chủ
				</GradientButton>
			</div>
		</div>
	);
}

export default NotFound;
