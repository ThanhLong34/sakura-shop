import axiosClient from "./axiosClient";

const group = "player";

const playerApi = {
	getAll() {
		const url = `${group}/getAll.php`;
		return axiosClient.get(url);
	},
};

export default playerApi;
