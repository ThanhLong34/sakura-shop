import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import playerReducer from "./playerSlice";
import gameDataReducer from "./gameDataSlice";

const rootReducer = {
	admin: adminReducer,
	player: playerReducer,
	gameData: gameDataReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
