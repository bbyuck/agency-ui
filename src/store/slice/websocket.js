import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	socketConnected: false,
	sendMessage: false,
};

const websocketSlice = createSlice({
	name: "websocket",
	initialState,
	reducers: {
		setSocketConnected(state = initialState, action) {
			state.socketConnected = action.payload;
		},
		setSendMessage(state = initialState, action) {
			state.sendMessage = action.payload;
		},
	},
});

export const { setSocketConnected, setSendMessage } = websocketSlice.actions;
export default websocketSlice.reducer;
