import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userStatus: sessionStorage.getItem("userStatus"),
	profile: {
		id: null,
		address: null,
		age: null,
		gender: null,
		height: null,
		hobby: null,
		idealType: null,
		job: null,
		mbti: null,
		photoData: null,
		selfDescription: null,
		smoking: null,
	},
	matchingRequestRemain: {
		currentCount: 0,
		maxCount: 0,
		searched: false,
	},
	matchMakerFriends: [],
};

const userInfoSlice = createSlice({
	name: "userInfo",
	initialState,
	reducers: {
		setUserStatus(state = initialState, action) {
			state.userStatus = action.payload;
			sessionStorage.setItem("userStatus", state.userStatus);
		},
		setProfile(state = initialState, action) {
			state.profile = action.payload;
		},
		setMatchingRequestRemain(state = initialState, action) {
			state.matchingRequestRemain = action.payload;
		},
		setMatchMakerFriends(state = initialState, action) {
			state.matchMakerFriends = action.payload;
		},
	},
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export
// dispatch(add(1)) 이런식으로 사용 -> dispatch(counterSlice.actions.add(1)) 형태

// reducer 는 configureStore에 등록을 위해 export default 합니다.
export const {
	setUserStatus,
	setProfile,
	setMatchingRequestRemain,
	setMatchMakerFriends,
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
