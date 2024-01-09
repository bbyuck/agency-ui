import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/slice/auth";
import statusSlice from "store/slice/status";

const store = configureStore({
	reducer: {
		auth: authSlice,
		status: statusSlice,
	},
});

export default store;
