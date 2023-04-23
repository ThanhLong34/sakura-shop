import { memo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./LockedMode.module.scss";
import LockIcon from "@/assets/images/LockIcon.png";
import GradientButton from "../GradientButton";

const cx = classNames.bind(styles);

LockedMode.propTypes = {
	levelRequire: PropTypes.number,
};

LockedMode.defaultProps = {
	levelRequire: 0,
};

function LockedMode({ levelRequire }) {
	const navigate = useNavigate();

	return (
		<div className={cx("wrapper")}>
			<div className={cx("card", "not-found")}>
				<img className={cx("image")} src={LockIcon} alt="lock mode" />
				<h6 className={cx("heading")}>
					Hmmm, bạn chưa đủ cấp độ để chơi chế độ này
					<br />
					Chế độ này yêu cầu bạn phải đạt cấp {levelRequire} trở lên
				</h6>
				<GradientButton className="mb-2" type="secondary" onClick={() => navigate("/dashboard")}>
					Quay lại trang chủ
				</GradientButton>
			</div>
		</div>
	);
}

export default memo(LockedMode);
