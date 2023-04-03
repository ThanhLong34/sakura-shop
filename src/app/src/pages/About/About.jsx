import { useEffect } from "react";
import userApi from "@/apis/userApi";
import classNames from "classnames/bind";
import styles from "./About.module.scss";

const cx = classNames.bind(styles);

function About() {
	useEffect(() => {
		const getUserList = async () => {
			const data = await userApi.getList();
			console.log(data);
		};

		getUserList();
	}, []);

	return (
		<div className={cx("about")}>
			<h1 className="page-title">About page</h1>
			<p>Open tab console in your dev tool to view user list get from api</p>
		</div>
	);
}

export default About;
