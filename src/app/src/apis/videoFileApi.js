import axiosClient from "./axiosClient";

const group = "video";

const videoFileApi = {
	getAll(params) {
		const url = `${group}/getAll.php?`;
		return axiosClient.get(url, { params });
	},
	getById(id) {
		const url = `${group}/getById.php?`;
		return axiosClient.get(url, { id });
	},
	deleteById(id) {
		const url = `${group}/deleteById.php?`;
		return axiosClient.delete(url, { data: { id } });
	},
	upload(file) {
		const url = `${group}/upload.php?`;

		const formData = new FormData();
		formData.append("video", file);
		
		return axiosClient.post(url, formData);
	},
};

export default videoFileApi;
