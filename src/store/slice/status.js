import { createSlice } from "@reduxjs/toolkit";
import order from "common/animation";

const initialState = {
	loading: false,
	alert: {
		open: false,
		type: null,
		message: null,
	},
	currentPath: null,
	animation: "next",
	callbackPage: null,
	requestReceived: false,
	requestRejected: false,
};

const statusSlice = createSlice({
	name: "status",
	initialState,
	reducers: {
		setLoading(state = initialState, action) {
			state.loading = action.payload.loading;
		},
		setAlert(state = initialState, action) {
			state.alert = action.payload.alert;
		},
		setAnimation(state = initialState, action) {
			if (!state.currentPath) {
				state.currentPath = action.payload.path;
				return;
			}
			if (
				order[action.payload.page].indexOf(state.currentPath) >
				order[action.payload.page].indexOf(action.payload.path)
			) {
				state.animation = "prev";
			} else {
				state.animation = "next";
			}
			state.currentPath = action.payload.path;
		},
		setCallbackPage(state, action) {
			state.callbackPage = action.payload.callbackPage;
		},
		resetCallBackPage(state) {
			state.callbackPage = null;
		},
		setRequestReceived(state = initialState, action) {
			state.requestReceived = action.payload;
		},
		setRequestRejected(state = initialState, action) {
			state.requestRejected = action.payload;
		},
	},
});

export const {
	setLoading,
	setAlert,
	setAnimation,
	setCallbackPage,
	resetCallBackPage,
	setRequestReceived,
	setRequestRejected,
} = statusSlice.actions;
export default statusSlice.reducer;
