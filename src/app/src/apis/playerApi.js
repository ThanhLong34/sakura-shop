import axiosClient from "./axiosClient";

const group = "player";

const playerApi = {
	getAll(params) {
		const url = `${group}/getAll.php?`;
		return axiosClient.get(url, { params });
	},
	trashById(id) {
		const url = `${group}/trashById.php?`;
		return axiosClient.put(url, { id });
	},
	lockById(id) {
		const url = `${group}/lockById.php?`;
		return axiosClient.put(url, { id });
	},
	unlockById(id) {
		const url = `${group}/unlockById.php?`;
		return axiosClient.put(url, { id });
	},
};

export default playerApi;
