import { createSlice } from "@reduxjs/toolkit";
import * as SessionStorage from "@/helpers/sessionStorage";

const player = createSlice({
	name: "player",
	initialState: {
		account: null || SessionStorage.getPlayerAccount(),
	},
	reducers: {
		loginPlayerAccount: (state, action) => {
			const account = action.payload;

			state.account = account;
			SessionStorage.setPlayerAccount(account);
		},
		logoutPlayerAccount: (state) => {
			state.account = null;
			SessionStorage.resetPlayerAccount();
		},
		updatePlayerAccountEmail: (state, action) => {
			state.account.email = action.payload;
			SessionStorage.setPlayerAccount(state.account);
		},
		updatePlayerAccountNickname: (state, action) => {
			state.account.nickname = action.payload;
			SessionStorage.setPlayerAccount(state.account);
		},
		updatePlayerAccountGameData: (state, action) => {
			const { payload } = action;

			state.account = {
				...state.account,
				health: (payload.health || payload.health === 0) ? +payload.health : +state.account.health,
				star: (payload.star || payload.star === 0) ? +payload.star : +state.account.star,
				diamond: (payload.diamond || payload.diamond === 0) ? +payload.diamond : +state.account.diamond,
				experience: (payload.experience || payload.experience === 0) ? +payload.experience : +state.account.experience,
				level: (payload.level || payload.level === 0) ? +payload.level : +state.account.level,
				remainingQuestions: (payload.remainingQuestions || payload.remainingQuestions === 0) ? +payload.remainingQuestions : +state.account.remainingQuestions,
				remainingAdvertisements: (payload.remainingAdvertisements || payload.remainingAdvertisements === 0) ? +payload.remainingAdvertisements : +state.account.remainingAdvertisements,
			};

			SessionStorage.setPlayerAccount(state.account);
		},
	},
});

const { reducer, actions } = player;
export const {
	loginPlayerAccount,
	logoutPlayerAccount,
	updatePlayerAccountEmail,
	updatePlayerAccountNickname,
	updatePlayerAccountGameData,
} = actions;
export default reducer;
