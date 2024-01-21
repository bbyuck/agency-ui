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
	},
});

export const { setLoading, setAlert, setAnimation } = statusSlice.actions;
export default statusSlice.reducer;
