import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/slice/auth";
import statusSlice from "store/slice/status";
import joinInfoSlice from "store/slice/joinInfo";

const store = configureStore({
	reducer: {
		auth: authSlice,
		status: statusSlice,
		joinInfo: joinInfoSlice,
	},
});

export default store;
