import { useEffect, useRef, useState } from "react";
import "./App.css";
import "style/common/Common.css";

import AuthenticatedRoutes from "route/authenticated/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "route/unauthenticated/UnAuthenticatedRoutes";
import { useSelector } from "react-redux";
import Loading from "components/common/Loading";
import ToastAlert from "components/common/ToastAlert";
import { inappDeny } from "util";
import AddToHomeScreen from "a2hs.js";

function App() {
	const { credentialToken } = useSelector((state) => state.auth);

	const logo = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="60px" viewBox="0 0 60 60" version="1.1">
<g id="surface1">
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(119,149,255);fill-opacity:1;" d="M 28.945312 0.1875 C 28.5 0.351562 27.65625 1.136719 23.601562 5.203125 C 19.089844 9.703125 18.761719 10.054688 18.574219 10.652344 C 17.777344 13.113281 20.273438 15.339844 22.558594 14.214844 C 22.757812 14.121094 23.847656 13.113281 24.996094 11.976562 L 27.070312 9.902344 L 27.070312 24.808594 C 27.070312 35.144531 27.105469 39.902344 27.199219 40.3125 C 27.46875 41.578125 28.675781 42.539062 30 42.539062 C 31.324219 42.539062 32.53125 41.578125 32.800781 40.3125 C 32.894531 39.902344 32.929688 35.144531 32.929688 24.808594 L 32.929688 9.902344 L 35.015625 11.976562 C 36.152344 13.113281 37.253906 14.121094 37.441406 14.214844 C 39.726562 15.339844 42.222656 13.101562 41.425781 10.652344 C 41.238281 10.066406 40.898438 9.691406 36.515625 5.296875 C 33.164062 1.921875 31.664062 0.503906 31.289062 0.328125 C 30.632812 0 29.636719 -0.0585938 28.945312 0.1875 Z M 28.945312 0.1875 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(119,149,255);fill-opacity:1;" d="M 9.855469 19.464844 C 8.917969 19.746094 8.132812 20.554688 7.863281 21.515625 C 7.769531 21.832031 7.734375 27.328125 7.734375 39.738281 C 7.734375 59.683594 7.664062 58.183594 8.613281 59.121094 C 9.5625 60.070312 7.804688 60 30 60 C 52.195312 60 50.4375 60.070312 51.386719 59.121094 C 52.335938 58.171875 52.277344 59.707031 52.242188 39.492188 C 52.207031 21.972656 52.207031 21.492188 51.984375 21.046875 C 51.691406 20.460938 51.140625 19.910156 50.554688 19.617188 C 50.121094 19.40625 49.816406 19.394531 45.46875 19.394531 C 40.933594 19.394531 40.828125 19.394531 40.359375 19.652344 C 38.636719 20.578125 38.203125 22.769531 39.480469 24.175781 C 40.265625 25.054688 40.582031 25.136719 43.6875 25.171875 L 46.40625 25.21875 L 46.40625 54.140625 L 13.59375 54.140625 L 13.59375 25.21875 L 16.324219 25.171875 C 19.417969 25.136719 19.734375 25.054688 20.519531 24.175781 C 21.796875 22.769531 21.363281 20.578125 19.640625 19.652344 C 19.171875 19.40625 19.03125 19.394531 14.707031 19.371094 C 12.035156 19.359375 10.101562 19.394531 9.855469 19.464844 Z M 9.855469 19.464844 "/>
</g>
</svg>

`;
	/**
	 * 로그인 시 rerender
	 */
	useEffect(() => {
		inappDeny();
		/**
		 * 1. Kakao SDK
		 */
		if (!window.Kakao.isInitialized()) {
			// JavaScript key를 인자로 주고 SDK 초기화
			window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
		}

		return () => {
			/**
			 * 1. session storage clear
			 */
			sessionStorage.clear();
		};
	}, []);

	const isAuthenticated = () => {
		return credentialToken && true;
	};

	return (
		<div className='App'>
			<Loading />
			<ToastAlert />
			{/* <AppHeader /> */}
			{/* TODO => 로그인 유지 기능 추가 필요 / 일단 무제한 로그인 */}
			{isAuthenticated() ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
			<AddToHomeScreen
				logoImage={logo}
				htmlContent={
					"알림을 받기 위해서는 홈 화면에 앱을 추가해야 합니다. <Strong>공유 버튼</Strong> → <Strong>'홈 화면에 추가'</Strong>를 눌러 앱을 추가해주세요."
				}
			/>
		</div>
	);
}

export default App;
