import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	memberCode: localStorage.getItem("memberCode"),
	memberStatus: sessionStorage.getItem("memberStatus"),
};

const memberInfoSlice = createSlice({
	name: "memberInfo",
	initialState,
	reducers: {
		setMemberCode(state = initialState, action) {
			state.memberCode = action.payload;
			localStorage.setItem("memberCode", state.memberCode);
		},
		setMemberStatus(state = initialState, action) {
			state.memberStatus = action.payload;
			sessionStorage.setItem("memberStatus", state.memberStatus);
		},
	},
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export
// dispatch(add(1)) 이런식으로 사용 -> dispatch(counterSlice.actions.add(1)) 형태

// reducer 는 configureStore에 등록을 위해 export default 합니다.
export const { setMemberCode, setMemberStatus } = memberInfoSlice.actions;
export default memberInfoSlice.reducer;
