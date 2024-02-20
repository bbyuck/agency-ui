import { useEffect, useRef } from "react";
import "./App.css";
import "style/common/Common.css";

import AuthenticatedRoutes from "route/authenticated/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "route/unauthenticated/UnAuthenticatedRoutes";
import { useSelector } from "react-redux";
import Loading from "components/common/Loading";
import ToastAlert from "components/common/ToastAlert";

function App() {
	const { credentialToken } = useSelector((state) => state.auth);

	/**
	 * 로그인 시 rerender
	 */
	useEffect(() => {
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
		</div>
	);
}

export default App;
