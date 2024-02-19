import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userStatus: sessionStorage.getItem("userStatus"),
	matchMakerStatus: sessionStorage.getItem("matchMakerStatus"),
};

const memberInfoSlice = createSlice({
	name: "memberInfo",
	initialState,
	reducers: {
		setUserStatus(state = initialState, action) {
			state.userStatus = action.payload;
			sessionStorage.setItem("userStatus", state.userStatus);
		},
		setMatchMakerStatus(state = initialState, action) {
			state.matchMakerStatus = action.payload;
			sessionStorage.setItem("matchMakerStatus", state.matchMakerStatus);
		},
	},
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export
// dispatch(add(1)) 이런식으로 사용 -> dispatch(counterSlice.actions.add(1)) 형태

// reducer 는 configureStore에 등록을 위해 export default 합니다.
export const { setUserStatus, setMatchMakerStatus } = memberInfoSlice.actions;
export default memberInfoSlice.reducer;
