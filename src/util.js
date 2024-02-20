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

export const inappDeny = () => {
	var inappdeny_exec_vanillajs = (callback) => {
		if (document.readyState !== "loading") {
			callback();
		} else {
			document.addEventListener("DOMContentLoaded", callback);
		}
	};
	inappdeny_exec_vanillajs(() => {
		var useragt = navigator.userAgent.toLowerCase();
		var target_url = window.location.href;

		if (useragt.match(/kakaotalk/i)) {
			//카카오톡 외부브라우저로 호출
			window.location.href =
				"kakaotalk://web/openExternal?url=" + encodeURIComponent(target_url);
		} else if (useragt.match(/line/i)) {
			//라인 외부브라우저로 호출
			if (target_url.indexOf("?") !== -1) {
				window.location.href = target_url + "&openExternalBrowser=1";
			} else {
				window.location.href = target_url + "?openExternalBrowser=1";
			}
		} else if (
			useragt.match(
				/inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i,
			)
		) {
			//그외 다른 인앱들
			if (useragt.match(/iphone|ipad|ipod/i)) {
				//아이폰은 강제로 사파리를 실행할 수 없다 ㅠㅠ
				//모바일대응뷰포트강제설정
				var mobile = document.createElement("meta");
				mobile.name = "viewport";
				mobile.content =
					"width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui";
				document.getElementsByTagName("head")[0].appendChild(mobile);
				//노토산스폰트강제설정
				var fonts = document.createElement("link");
				fonts.href =
					"https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap";
				document.getElementsByTagName("head")[0].appendChild(fonts);
				document.body.innerHTML =
					"<style>body{margin:0;padding:0;font-family: 'Noto Sans KR', sans-serif;overflow: hidden;height: 100%;}</style><h2 style='padding-top:50px; text-align:center;font-family: 'Noto Sans KR', sans-serif;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2><article style='text-align:center; font-size:17px; word-break:keep-all;color:#999;'>아래 버튼을 눌러 Safari를 실행해주세요<br />Safari가 열리면, 주소창을 길게 터치한 뒤,<br />'붙여놓기 및 이동'을 누르면<br />정상적으로 이용할 수 있습니다.<br /><br /><button onclick='inappbrowserout();' style='min-width:180px;margin-top:10px;height:54px;font-weight: 700;background-color:#31408E;color:#fff;border-radius: 4px;font-size:17px;border:0;'>Safari로 열기</button></article><img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />";
			} else {
				//안드로이드는 Chrome이 설치되어있음으로 강제로 스킴실행한다.
				window.location.href =
					"intent://" +
					target_url.replace(/https?:\/\//i, "") +
					"#Intent;scheme=http;package=com.android.chrome;end";
			}
		}
	});
};
