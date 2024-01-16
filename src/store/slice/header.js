import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	leftComponent: "none",
	rightComponent: "none",
};

const headerSlice = createSlice({
	name: "header",
	initialState,
	reducers: {
		setHeaderComponent(state, action) {
			state.leftComponent = action.payload.leftComponent;
			state.rightComponent = action.payload.rightComponent;
		},
		resetHeaderComponent(state, action) {
			state.leftComponent = "none";
			state.rightComponent = "none";
		},
	},
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export
// dispatch(add(1)) 이런식으로 사용 -> dispatch(counterSlice.actions.add(1)) 형태

// reducer 는 configureStore에 등록을 위해 export default 합니다.
export const { setHeaderComponent, resetHeaderComponent } = headerSlice.actions;
export default headerSlice.reducer;
