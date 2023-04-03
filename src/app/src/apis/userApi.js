import axiosClient from "./axiosClient";

const group = "users"

const userApi = {
	getList(params) {
		const url = `${group}`;
		return axiosClient.get(url, { params });
	},
	getItem(id) {
		const url = `${group}/${id}`;
		return axiosClient.get(url);
	},
	add(data) {
		const url = `${group}`;
		return axiosClient.post(url, data);
	},
	updated(data) {
		const url = `${group}/${data.id}`;
		return axiosClient.put(url, data);
	},
	remove(id) {
		const url = `${group}/${id}`;
		return axiosClient.delete(url);
	},
};

export default userApi;
