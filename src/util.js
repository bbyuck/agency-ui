export const hasTokenOnSession = () => {
	return sessionStorage.getItem("auth") != null;
};

export const getTokenFromSession = () => {
	return JSON.parse(sessionStorage.getItem("auth"));
};

export const saveAuthInfoOnClient = (authInfo) => {
	sessionStorage.setItem("accessToken", authInfo.accessToken);
	sessionStorage.setItem("refreshToken", authInfo.refreshToken);
	localStorage.setItem("userId", authInfo.kakaoId);
	localStorage.setItem("memberType", authInfo.memberType);
};

export const muiTextFieldFocus = (ref) => {
	return ref.current.childNodes[1].childNodes[0].focus();
};

export const muiTextFieldClear = (ref) => {
	ref.current.childNodes[1].childNodes[0].value = "";
};

export const isMobile = () => {
	const user = navigator.userAgent;
	return user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1;
};

const LINE_FEED = 10; // '\n'

const getByteLength = (decimal) => {
	return decimal >> 7 || LINE_FEED === decimal ? 2 : 1;
};

export const getBytes = (str) => {
	return str
		.split("")
		.map((s) => s.charCodeAt(0))
		.reduce(
			(prev, unicodeDecimalValue) => prev + getByteLength(unicodeDecimalValue),
			0,
		);
};

export const getBirthYears = () => {
	const birthYears = [];
	const oldest = 90;
	const youngest = 100;

	birthYears.push({ label: "선택", value: "none" });
	for (let year = oldest; year <= youngest; year++) {
		const fast_ = "빠른 " + (year % 100 < 10 ? "0" : "") + (year % 100);
		const year_ = (year % 100 < 10 ? "0" : "") + (year % 100);

		birthYears.push({ label: fast_, value: fast_ });
		birthYears.push({ label: year_, value: year_ });
	}

	return birthYears;
};

export const getHeights = () => {
	const heights = [];
	const shortest = 140;
	const tallest = 200;

	heights.push({ label: "선택", value: "none" });
	for (let height = shortest; height <= tallest; height++) {
		heights.push({ label: height, value: height });
	}
	return heights;
};
