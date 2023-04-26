import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./OptionalMode.module.scss";

import NotAllowedToPlay from "@/mobile/components/NotAllowedToPlay";
import LockedMode from "@/mobile/components/LockedMode";
import SelectLevel from "@/mobile/components/SelectLevel";
import topicApi from "@/apis/topicApi";
import { Button } from "primereact/button";

const cx = classNames.bind(styles);

function OptionalMode() {
	const playerAccount = useSelector((state) => state.player.account);

	const [topics, setTopics] = useState(null);
	const [topicSelected, setTopicSelected] = useState(null);

	const levelRequire = 10;

	useEffect(() => {
		topicApi.getAll().then((response) => {
			if (response.code === 1) {
				setTopics(
					response.data.map((topic) => ({
						...topic,
						id: +topic.id,
					}))
				);
			}
		});
	}, []);

	const handleResetTopicSelected = () => {
		setTopicSelected(null);
	};

	if (+playerAccount.level < levelRequire) {
		return (
			<div className={cx("wrapper")}>
				<LockedMode levelRequire={levelRequire} />
			</div>
		);
	}

	if (+playerAccount.health > 0) {
		if (topicSelected) {
			return (
				<div className={cx("wrapper")}>
					<SelectLevel topicId={topicSelected} showGoBackButton onGoBack={handleResetTopicSelected} />;
				</div>
			);
		} else {
			return (
				<div className={cx("wrapper")}>
					<div className="card">
						<h5 className={cx("heading", "mb-3")}>CHỌN CHỦ ĐỀ</h5>
						<div
							className="grid"
							style={{
								justifyContent: "center",
							}}
						>
							{topics &&
								topics
									.filter((topic) => topic.id !== 1)
									.map((topic) => (
										<div key={topic.id} className="col-6">
											<div className={cx("topic")}>
												<img className={cx("topic-image")} src={topic.imageUrl} alt="topic" />
												<div className={cx("topic-info")}>
													<div className={cx("topic-name")}>{topic.name}</div>
												</div>
												<Button
													className="w-full mt-2"
													label="Chọn"
													onClick={() => setTopicSelected(topic.id)}
												/>
											</div>
										</div>
									))}
						</div>
					</div>
				</div>
			);
		}
	} else {
		return (
			<div className={cx("wrapper")}>
				<NotAllowedToPlay />
			</div>
		);
	}
}

export default OptionalMode;
