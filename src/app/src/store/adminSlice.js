import { createSlice } from "@reduxjs/toolkit";
import * as LocalStorage from "@/helpers/localStorage";

const admin = createSlice({
	name: "admin",
	initialState: {
		account: null || LocalStorage.getAdminAccount(),
	},
	reducers: {
		setAdminAccount: (state, action) => {
			const account = action.payload;
			LocalStorage.setAdminAccount(account);
			state.account = account;
		},
	},
});

const { reducer, actions } = admin;
export const { setAdminAccount } = actions;
export default reducer;
