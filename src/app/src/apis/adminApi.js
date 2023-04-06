import axiosClient from "./axiosClient";

const group = "admin";

const adminApi = {
	login(data) {
		const url = `${group}/login.php`;
		return axiosClient.post(url, data);
	},
	resetPassword(data) {
		const url = `${group}/resetPassword.php`;
		return axiosClient.post(url, data);
	},
};

export default adminApi;
