import { createSlice } from "@reduxjs/toolkit";
import { removeAuthInfoOnClient } from "util";
import { saveAuthInfoOnClient } from "util";

const initialState = {
	credentialToken: localStorage.getItem("credentialToken"),
	memberType: localStorage.getItem("memberType"),
};

const authSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		authenticate(state = initialState, action) {
			state.credentialToken = action.payload.credentialToken;
			state.memberType = action.payload.memberType;
			saveAuthInfoOnClient(action.payload);
		},
		resetAuthentication(state, action) {
			removeAuthInfoOnClient();
			state.credentialToken = null;
			state.memberType = null;
		},
	},
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export
// dispatch(add(1)) 이런식으로 사용 -> dispatch(counterSlice.actions.add(1)) 형태

// reducer 는 configureStore에 등록을 위해 export default 합니다.
export const { authenticate, resetAuthentication } = authSlice.actions;
export default authSlice.reducer;
