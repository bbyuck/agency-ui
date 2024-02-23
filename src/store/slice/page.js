import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tab: 0,
	lev: 0,
	isNext: true,
};

const pageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {
		setTab(state = initialState, action) {
			state.tab = action.payload;
		},
		addLev(state = initialState) {
			state.lev = state.lev + 1;
			state.isNext = true;
		},
		subLev(state = initialState) {
			state.lev = state.lev - 1;
			state.isNext = false;
		},
		resetLev(state = initialState) {
			state.lev = 0;
			state.isNext = true;
		},
	},
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export
// dispatch(add(1)) 이런식으로 사용 -> dispatch(counterSlice.actions.add(1)) 형태

// reducer 는 configureStore에 등록을 위해 export default 합니다.
export const { setTab, addLev, subLev, resetLev } = pageSlice.actions;
export default pageSlice.reducer;
