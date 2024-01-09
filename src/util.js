export const hasTokenOnSession = () => {
	return sessionStorage.getItem("auth") != null;
};

export const getTokenFromSession = () => {
	return JSON.parse(sessionStorage.getItem("auth"));
};

export const saveAuthInfoOnClient = (authInfo) => {
	sessionStorage.setItem("accessToken", authInfo.accessToken);
	sessionStorage.setItem("refreshToken", authInfo.refreshToken);
	sessionStorage.setItem("loginId", authInfo.loginId);
};

export const muiTextFieldFocus = (ref) => {
	return ref.current.childNodes[1].childNodes[0].focus();
};

export const muiTextFieldClear = (ref) => {
	ref.current.childNodes[1].childNodes[0].value = "";
};
