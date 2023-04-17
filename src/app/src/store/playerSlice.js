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
	},
});

const { reducer, actions } = player;
export const { loginPlayerAccount, logoutPlayerAccount, updatePlayerAccountEmail, updatePlayerAccountNickname } = actions;
export default reducer;
