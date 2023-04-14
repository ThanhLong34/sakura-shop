import axiosClient from "./axiosClient";

const group = "answer";

const answerApi = {
	getAll(params) {
		const url = `${group}/getAll.php?`;
		return axiosClient.get(url, { params });
	},
	getByQuestionId(questionId) {
		const url = `${group}/getByQuestionId.php?`;
		const params = {
			questionId,
		};
		return axiosClient.get(url, { params });
	},
	trashById(id) {
		const url = `${group}/trashById.php?`;
		return axiosClient.put(url, { id });
	},
	trashByQuestionId(questionId) {
		const url = `${group}/trashByQuestionId.php?`;
		return axiosClient.put(url, { questionId });
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

export default answerApi;
