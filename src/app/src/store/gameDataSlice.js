import { createSlice } from "@reduxjs/toolkit";
import * as SessionStorage from "@/helpers/sessionStorage";

const gameData = createSlice({
	name: "gameData",
	initialState: {
		value: null || SessionStorage.getGameData(),
	},
	reducers: {
		setGameDataValue: (state, action) => {
			const value = action.payload;

			state.value = value;
			SessionStorage.setGameData(value);
		},
		resetGameDataValue: (state) => {
			state.value = null;
			SessionStorage.resetGameData();
		},
	},
});

const { reducer, actions } = gameData;
export const { setGameDataValue, resetGameDataValue } = actions;
export default reducer;
