export const hasTokenOnSession = () => {
	return sessionStorage.getItem("auth") != null;
};

export const getTokenFromSession = () => {
	return JSON.parse(sessionStorage.getItem("auth"));
};

export const getCredentialToken = () => {
	return localStorage.getItem("credentialToken");
};

export const saveAuthInfoOnClient = (authInfo) => {
	if (authInfo.accessToken && authInfo.accessToken !== "null") {
		sessionStorage.setItem("accessToken", authInfo.accessToken);
	}
	if (authInfo.refreshToken && authInfo.refreshToken !== "null") {
		sessionStorage.setItem("refreshToken", authInfo.refreshToken);
	}

	if (
		authInfo.oauthId &&
		authInfo.oauthId !== "null" &&
		authInfo.oauthCode &&
		authInfo.oauthCode !== "null"
	) {
		sessionStorage.setItem("oauthId", authInfo.oauthId);
		sessionStorage.setItem("oauthCode", authInfo.oauthCode);
	}

	if (authInfo.credentialToken && authInfo.credentialToken !== "null") {
		localStorage.setItem("credentialToken", authInfo.credentialToken);
	}
};

export const removeAuthInfoOnClient = () => {
	localStorage.removeItem("credentialToken");
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

export const getBirthYearDistance = () => {
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

export const getHeightDistance = () => {
	const heights = [];
	const shortest = 150;
	const tallest = 200;

	heights.push({ label: "선택", value: "none" });
	for (let height = shortest; height <= tallest; height++) {
		heights.push({ label: height, value: height });
	}
	return heights;
};

export const forceHome = () => {
	var Backlen = window.history.length;
	window.history.go(-Backlen);
	window.location.href = process.env.REACT_APP_CLIENT;

	return false;
};

const blockEventBubbling = (e) => {
	e.preventDefault();
};

export const scrollDisable = () => {
	const html = document.getElementById("html");
	const body = document.getElementById("body");

	html.classList.add("noscroll");
	body.classList.add("noscroll");

	body.addEventListener("scroll", blockEventBubbling, { passive: false });
	body.addEventListener("touchmove", blockEventBubbling, { passive: false });
	body.addEventListener("mousewheel", blockEventBubbling, { passive: false });
};

export const scrollAble = () => {
	const html = document.getElementById("html");
	const body = document.getElementById("body");

	html.classList.remove("noscroll");
	body.classList.remove("noscroll");

	body.removeEventListener("scroll", blockEventBubbling);
	body.removeEventListener("touchmove", blockEventBubbling);
	body.removeEventListener("mousewheel", blockEventBubbling);
};

export const setScreenSize = () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
};
