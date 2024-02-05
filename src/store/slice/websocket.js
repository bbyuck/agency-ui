import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	socketConnected: false,
	sendMessage: false,
	items: [],
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
		setItems(state = initialState, action) {
			state.items = action.payload;
		},
	},
});

export const { setSocketConnected, setSendMessage, setItems } =
	websocketSlice.actions;
export default websocketSlice.reducer;
