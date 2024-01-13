import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	memberType: null,
	matchMakerName: null,
};

const joinInfoSlice = createSlice({
	name: "joinInfo",
	initialState,
	reducers: {
		selectMemberType(state, action) {
			state.memberType = action.payload.memberType;
		},
		resetMemberType(state, action) {
			state.memberType = null;
		},
		setMatchMakerName(state, action) {
			state.matchMakerName =
				action.payload.matchMakerName === "" ? null : action.payload.matchMakerName;
		},
		resetMatchMakerName(state, action) {
			state.matchMakerName = null;
		},
	},
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export
// dispatch(add(1)) 이런식으로 사용 -> dispatch(counterSlice.actions.add(1)) 형태

// reducer 는 configureStore에 등록을 위해 export default 합니다.
export const {
	selectMemberType,
	resetMemberType,
	setMatchMakerName,
	resetMatchMakerName,
} = joinInfoSlice.actions;
export default joinInfoSlice.reducer;
