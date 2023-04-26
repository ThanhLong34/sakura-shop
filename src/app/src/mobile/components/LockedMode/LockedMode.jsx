import { memo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./LockedMode.module.scss";
import LockIcon from "@/assets/images/LockIcon.png";
import { Button } from "primereact/button";

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
			<div className={cx("card", "content")}>
				<img className={cx("image", 'mb-2')} src={LockIcon} alt="lock mode" />
				<h6 className={cx("heading", 'mb-3')}>
					Hmmm, bạn chưa đủ cấp độ để chơi chế độ này
					<br />
					Chế độ này yêu cầu bạn phải đạt <span>cấp {levelRequire}</span> trở lên
				</h6>
				<Button label="Quay lại trang chủ" onClick={() => navigate("/dashboard")} />
			</div>
		</div>
	);
}

export default memo(LockedMode);
