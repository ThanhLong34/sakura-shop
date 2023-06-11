import axiosClient from "./axiosClient";

const group = "survey";

const topicApi = {
	getAll(params) {
		const url = `${group}/getAll.php?`;
		return axiosClient.get(url, { params });
	},
	trashById(id) {
		const url = `${group}/trashById.php?`;
		return axiosClient.put(url, { id });
	},
	add(data) {
		const url = `${group}/add.php?`;
		return axiosClient.post(url, data);
	},
	update(data) {
		const url = `${group}/update.php?`;
		return axiosClient.put(url, data);
	},
	getPhoneNumbersByApi(api) {
		return fetch(api).then((res) => res.json());
	},
};

export default topicApi;
