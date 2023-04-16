import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import playerReducer from "./playerSlice";

const rootReducer = {
	admin: adminReducer,
	player: playerReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
