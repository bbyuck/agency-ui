import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/slice/auth";
import statusSlice from "store/slice/status";
import joinInfoSlice from "store/slice/joinInfo";
import header from "store/slice/header";

const store = configureStore({
	reducer: {
		auth: authSlice,
		status: statusSlice,
		joinInfo: joinInfoSlice,
		header: header,
	},
});

export default store;
