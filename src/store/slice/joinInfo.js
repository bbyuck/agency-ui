import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	memberType: null,
	matchMakerCode: null,
};

const joinInfoSlice = createSlice({
	name: "joinInfo",
	initialState,
	reducers: {
		selectMemberCode(state, action) {
			state.memberType = action.payload.memberType;
		},
		resetMemberCode(state, action) {
			state.memberType = null;
		},
		setMatchMakerCode(state, action) {
			state.matchMakerCode =
				action.payload.matchMakerCode === "" ? null : action.payload.matchMakerCode;
		},
		resetMatchMakerCode(state, action) {
			state.matchMakerCode = null;
		},
	},
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export
// dispatch(add(1)) 이런식으로 사용 -> dispatch(counterSlice.actions.add(1)) 형태

// reducer 는 configureStore에 등록을 위해 export default 합니다.
export const {
	selectMemberCode,
	resetMemberCode,
	setMatchMakerCode,
	resetMatchMakerCode,
} = joinInfoSlice.actions;
export default joinInfoSlice.reducer;
