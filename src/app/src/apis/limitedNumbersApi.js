import axiosClient from "./axiosClient";

const group = "limitedNumbers";

const limitedNumbersApi = {
	getByPlayerId(playerId) {
		const url = `${group}/getByPlayerId.php?`;
		const params = {
			playerId,
		};
		return axiosClient.get(url, { params });
	},
	login(data) {
		const url = `${group}/login.php?`;
		return axiosClient.post(url, data);
	},
	substractRemainingQuestions(playerId) {
		const url = `${group}/substractRemainingQuestions.php?`;
		return axiosClient.put(url, { playerId });
	},
	substractRemainingAdvertisements(playerId) {
		const url = `${group}/substractRemainingAdvertisements.php?`;
		return axiosClient.put(url, { playerId });
	}
};

export default limitedNumbersApi;
