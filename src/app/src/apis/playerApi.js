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
	login(data) {
		const url = `${group}/login.php`;
		return axiosClient.post(url, data);
	},
	register(data) {
		const url = `${group}/register.php`;
		return axiosClient.post(url, data);
	},
	resetPassword(data) {
		const url = `${group}/resetPassword.php`;
		return axiosClient.post(url, data);
	},
	updatePassword(data) {
		const url = `${group}/updatePassword.php`;
		return axiosClient.put(url, data);
	},
	updateEmail(data) {
		const url = `${group}/updateEmail.php`;
		return axiosClient.put(url, data);
	},
	updateNickname(data) {
		const url = `${group}/updateNickname.php`;
		return axiosClient.put(url, data);
	},
	updateGameData(data) {
		const url = `${group}/updateGameData.php`;
		return axiosClient.put(url, data);
	},
};

export default playerApi;
