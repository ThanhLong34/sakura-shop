import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";

const rootReducer = {
	admin: adminReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
