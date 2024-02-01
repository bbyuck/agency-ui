import { useEffect } from "react";
import "./App.css";
import "style/common/Common.css";

import AuthenticatedRoutes from "pages/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "pages/UnAuthenticatedRoutes";
import { useSelector } from "react-redux";
import Loading from "components/common/Loading";
import ToastAlert from "components/common/ToastAlert";
import { useSearchParams } from "react-router-dom";
import { TEMP } from "constants/memberCode";

function App() {
	const { credentialToken, memberCode, oauthId, oauthCode } = useSelector(
		(state) => state.auth,
	);

	const [searchParams] = useSearchParams();
	const matchmakerCode = searchParams.get("matchmaker");
	if (matchmakerCode) {
		sessionStorage.setItem("mc", matchmakerCode);
	}
	/**
	 * 로그인 시 rerender
	 */
	useEffect(() => {}, [credentialToken, memberCode, oauthId, oauthCode]);

	// // page no scroll
	// const setScreenSize = () => {
	// 	let vh = window.innerHeight * 0.01;
	// 	document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
	// };

	useEffect(() => {
		if (!window.Kakao.isInitialized()) {
			// JavaScript key를 인자로 주고 SDK 초기화
			window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
		}

		/**
		 * 주선자 코드 자동입력
		 */

		// 페이지 변경 alert
		// window.addEventListener("beforeunload", preventClose);

		return () => {
			sessionStorage.clear();
		};
	}, []);

	const isAuthenticated = () => {
		return (
			credentialToken || // 일반적인 로그인 상황
			(memberCode === TEMP && oauthId && oauthCode) // 동의서 처리
		);
	};

	return (
		<div className='App'>
			<Loading />
			<ToastAlert />
			{/* <AppHeader /> */}
			{/* TODO => 로그인 유지 기능 추가 필요 / 일단 무제한 로그인 */}
			{isAuthenticated() ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
		</div>
	);
}

export default App;
