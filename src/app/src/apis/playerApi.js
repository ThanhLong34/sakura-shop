import axiosClient from "./axiosClient";

const group = "player";

const playerApi = {
	getAll(params) {
		const url = `${group}/getAll.php?`;
		return axiosClient.get(url, { params });
	},
};

export default playerApi;
