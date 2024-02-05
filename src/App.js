import { useEffect, useRef } from "react";
import "./App.css";
import "style/common/Common.css";

import AuthenticatedRoutes from "route/authenticated/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "route/unauthenticated/UnAuthenticatedRoutes";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/common/Loading";
import ToastAlert from "components/common/ToastAlert";
import { useSearchParams } from "react-router-dom";
import { TEMP } from "constants/memberCode";
import {
	setItems,
	setSendMessage,
	setSocketConnected,
} from "store/slice/websocket";

function App() {
	const dispatch = useDispatch();

	const { credentialToken, oauthId, oauthCode } = useSelector(
		(state) => state.auth,
	);
	const { memberCode } = useSelector((state) => state.memberInfo);
	const [searchParams] = useSearchParams();
	const matchmakerCode = searchParams.get("matchmaker");
	if (matchmakerCode) {
		sessionStorage.setItem("mc", matchmakerCode);
	}

	/**
	 * 로그인 시 rerender
	 */
	useEffect(() => {}, [credentialToken, memberCode, oauthId, oauthCode]);
	useEffect(() => {
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
