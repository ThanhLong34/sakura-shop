import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
import PageNotFoundAdmin from "@/assets/images/PageNotFoundAdmin.png";
import { Button } from "primereact/button";

const cx = classNames.bind(styles);

function NotFound() {
	const navigate = useNavigate();

	return (
		<div className={cx("wrapper")}>
			<div className={cx("card", "not-found")}>
				<img className={cx("image")} src={PageNotFoundAdmin} alt="page not found" />
				<h6 className={cx("heading", "mb-3")}>
					Hmmm, có gì đó sai sai ở đây
					<br />
					Trang mà bạn muốn tới không tồn tại
				</h6>
				<Button label="Quay lại trang chủ" severity="danger" outlined onClick={() => navigate("/")} />
			</div>
		</div>
	);
}

export default NotFound;
