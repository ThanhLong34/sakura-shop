import SelectLevel from "@/browser/components/SelectLevel";

function ClassicMode() {
	// Default is lipstick topic
	const lipstickTopicId = 3;

	return (
		<div>
			<SelectLevel topicId={lipstickTopicId} />
		</div>
	);
}

export default ClassicMode;
