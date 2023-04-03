import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
	return (
		<div className={cx("shop")}>
			<h1 className="page-title">Error 404</h1>
			<h2>Page not found</h2>
		</div>
	);
}

export default NotFound;
