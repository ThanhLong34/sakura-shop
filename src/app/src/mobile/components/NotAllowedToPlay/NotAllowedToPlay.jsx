import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NotAllowedToPlay.module.scss";
import ExhaustedImage from "@/assets/images/Exhausted.png";
import { Button } from "primereact/button";

const cx = classNames.bind(styles);

function NotAllowedToPlay() {
	const navigate = useNavigate();

	return (
		<div className={cx("wrapper")}>
			<div className={cx("card", "content")}>
				<img className={cx("image", "mb-2")} src={ExhaustedImage} alt="exhausted" />
				<h6 className={cx("heading", "mb-3")}>
					Ôi không, bạn đã hết sức khỏe rồi
					<br />
					Hãy đi thu thập sức khỏe bằng cách <br /> <span>trả lời câu hỏi</span> hoặc <span>xem quảng cáo</span>
				</h6>
				<Button label="Đi thu thập sức khỏe thôi nào" onClick={() => navigate("/quiz-and-ads")} />
			</div>
		</div>
	);
}

export default NotAllowedToPlay;
