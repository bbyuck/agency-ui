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

	for (let year = oldest; year <= youngest; year++) {
		birthYears.push("빠른 " + (year % 100 < 10 ? "0" : "") + (year % 100));
		birthYears.push((year % 100 < 10 ? "0" : "") + (year % 100));
	}

	return birthYears;
};
