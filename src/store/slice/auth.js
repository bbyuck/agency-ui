import { createSlice } from "@reduxjs/toolkit";
import { saveAuthInfoOnClient } from "util";

const initialState = {
	accessToken: "",
	refreshToken: "",
	userId: "",
	expiration: "",
};

const authSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		authenticate(state = initialState, action) {
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			state.expiration = action.payload.expiration;
			state.loingId = action.payload.loginId;

			/**
			 * web client storage에 인증 정보 저장
			 */
			saveAuthInfoOnClient(state);
		},
	},
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export
// dispatch(add(1)) 이런식으로 사용 -> dispatch(counterSlice.actions.add(1)) 형태

// reducer 는 configureStore에 등록을 위해 export default 합니다.
export const { authenticate } = authSlice.actions;
export default authSlice.reducer;
