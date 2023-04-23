import axiosClient from "./axiosClient";

const group = "reward";

const rewardApi = {
	getAll(params) {
		const url = `${group}/getAll.php?`;
		return axiosClient.get(url, { params });
	},
	getAllByPlayerId(_params, playerId) {
		const url = `${group}/getAllByPlayerId.php?`;
		const params = {
			..._params,
			playerId
		}
		return axiosClient.get(url, { params });
	},
	getByPlayerId(playerId) {
		const url = `${group}/getByPlayerId.php?`;
		const params = {
			playerId,
		};
		return axiosClient.get(url, { params });
	},
	add(data) {
		const url = `${group}/add.php?`;
		return axiosClient.post(url, data);
	},
};

export default rewardApi;
