import axiosClient from "./axiosClient";

const group = "card";

const cardApi = {
	getAll(params) {
		const url = `${group}/getAll.php?`;
		return axiosClient.get(url, { params });
	},
	trashById(id) {
		const url = `${group}/trashById.php?`;
		return axiosClient.put(url, { id });
	},
	trashByTopicId(topicId) {
		const url = `${group}/trashByTopicId.php?`;
		return axiosClient.put(url, { topicId });
	},
	add(data) {
		const url = `${group}/add.php?`;
		return axiosClient.post(url, data);
	},
	update(data) {
		const url = `${group}/update.php?`;
		return axiosClient.put(url, data);
	},
};

export default cardApi;
