import classNames from "classnames/bind";
import styles from "./Shop.module.scss";

const cx = classNames.bind(styles);

function Shop() {
	return (
		<div className={cx("shop")}>
			<h1 className="page-title">Shop page</h1>
		</div>
	);
}

export default Shop;
