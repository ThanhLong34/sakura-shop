import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
	return (
		<div>
			<h1>Mobile page not found</h1>
			<h2>Page not found</h2>
		</div>
	);
}

export default NotFound;
