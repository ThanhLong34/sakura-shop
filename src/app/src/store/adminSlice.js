import { createSlice } from "@reduxjs/toolkit";
import * as SessionStorage from "@/helpers/sessionStorage";

const admin = createSlice({
	name: "admin",
	initialState: {
		account: null || SessionStorage.getAdminAccount(),
	},
	reducers: {
		setAdminAccount: (state, action) => {
			const account = action.payload;
			SessionStorage.setAdminAccount(account);
			state.account = account;
		},
		resetAdminAccount: (state) => {
			SessionStorage.resetAdminAccount();
			state.account = null;
		},
	},
});

const { reducer, actions } = admin;
export const { setAdminAccount, resetAdminAccount } = actions;
export default reducer;
