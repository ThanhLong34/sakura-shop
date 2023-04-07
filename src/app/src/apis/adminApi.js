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
	updatePassword(data) {
		const url = `${group}/updatePassword.php`;
		return axiosClient.put(url, data);
	},
	updateEmail(data) {
		const url = `${group}/updateEmail.php`;
		return axiosClient.put(url, data);
	},
	updatePhoneNumber(data) {
		const url = `${group}/updatePhoneNumber.php`;
		return axiosClient.put(url, data);
	},
};

export default adminApi;
