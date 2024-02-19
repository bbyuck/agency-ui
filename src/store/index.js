import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/slice/auth";
import statusSlice from "store/slice/status";
import header from "store/slice/header";
import memberInfoSlice from "store/slice/memberInfo";
import websocket from "./slice/websocket";
import userInfo from "./slice/userInfo";

const store = configureStore({
	reducer: {
		auth: authSlice,
		status: statusSlice,
		memberInfo: memberInfoSlice,
		header: header,
		userInfo: userInfo,
		websocket: websocket,
	},
});

export default store;
