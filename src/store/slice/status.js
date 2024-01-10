import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	alert: {
		open: false,
		type: null,
		message: null,
	},
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
	},
});

export const { setLoading, setAlert } = statusSlice.actions;
export default statusSlice.reducer;
