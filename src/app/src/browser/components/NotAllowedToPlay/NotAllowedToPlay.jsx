import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NotAllowedToPlay.module.scss";
import GradientButton from "../GradientButton";
import ExhaustedImage from "@/assets/images/Exhausted.png";

const cx = classNames.bind(styles);

function NotAllowedToPlay() {
	const navigate = useNavigate();

	return (
		<div className={cx("card mt-2", "wrapper")}>
			<img className={cx("image")} src={ExhaustedImage} alt="exhausted" />
			<h6 className={cx("heading")}>
				Ôi không, bạn đã hết sức khỏe rồi
				<br />
				Hãy đi thu thập sức khỏe bằng cách <span>trả lời câu hỏi</span> hoặc <span>xem quảng cáo</span>
			</h6>
			<GradientButton className="mb-2" type="secondary" onClick={() => navigate("/quiz-and-ads")}>
				Đi thu thập sức khỏe thôi nào
			</GradientButton>
		</div>
	);
}

export default NotAllowedToPlay;
