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
	},
});

const { reducer, actions } = admin;
export const { setAdminAccount } = actions;
export default reducer;
