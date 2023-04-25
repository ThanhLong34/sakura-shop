import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
	return (
		<div>
			<div>
				<button>Menu</button>
			</div>
			<div>Profile</div>
		</div>
	);
}

export default Header;
