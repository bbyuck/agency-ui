import { useEffect } from "react";
import "./App.css";
import "style/common/Common.css";

import AuthenticatedRoutes from "route/authenticated/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "route/unauthenticated/UnAuthenticatedRoutes";
import { useSelector } from "react-redux";
import Loading from "components/common/Loading";
import ToastAlert from "components/common/ToastAlert";
import { inappDeny } from "util";
import A2HS from "components/common/A2HS";
import PromptText from "components/common/PromptText";

function App() {
	const { credentialToken } = useSelector((state) => state.auth);
	const isKakaoInAppBrowser = () => {
		return window.navigator.userAgent.toLowerCase().indexOf("kakao") !== -1;
	};

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

	const AppRender = () => {
		return (
			<>
				{isKakaoInAppBrowser() ? (
					<PromptText
						title={"접근 불가"}
						subtitle={"호환성 문제로 인앱브라우저에서는 접근하실 수 없습니다."}
					/>
				) : isAuthenticated() ? (
					<AuthenticatedRoutes />
				) : (
					<UnAuthenticatedRoutes />
				)}
			</>
		);
	};

	return (
		<div className='App'>
			<Loading />
			<ToastAlert />
			{/* <AppHeader /> */}
			{/* TODO => 로그인 유지 기능 추가 필요 / 일단 무제한 로그인 */}
			<AppRender />
			<A2HS />
		</div>
	);
}

export default App;
