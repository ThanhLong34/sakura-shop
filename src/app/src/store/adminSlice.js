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

			state.account = account;
			SessionStorage.setAdminAccount(account);
		},
		resetAdminAccount: (state) => {
			state.account = null;
			SessionStorage.resetAdminAccount();
		},
		updateAdminAccountEmail: (state, action) => {
			state.account.email = action.payload;
			SessionStorage.setAdminAccount(state.account);
		},
		updateAdminAccountPhoneNumber: (state, action) => {
			state.account.phoneNumber = action.payload;
			SessionStorage.setAdminAccount(state.account);
		},
	},
});

const { reducer, actions } = admin;
export const { setAdminAccount, resetAdminAccount, updateAdminAccountEmail, updateAdminAccountPhoneNumber } = actions;
export default reducer;
