import { useEffect } from "react";
import "./App.css";
import "style/common/Common.css";

import AuthenticatedRoutes from "pages/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "pages/UnAuthenticatedRoutes";
import { useSelector } from "react-redux";
import Loading from "components/common/Loading";
import ToastAlert from "components/common/ToastAlert";
import AppHeader from "components/common/header/AppHeader";

function App() {
	const credentialToken = useSelector((state) => state.auth.credentialToken);
	const memberType = useSelector((state) => state.auth.memberType);

	console.log(credentialToken);

	/**
	 * 로그인 시 rerender
	 */
	useEffect(() => {}, [credentialToken, memberType]);

	const preventClose = (e) => {
		console.log(e);
		e.preventDefault();
		e.returnValue = ""; //Chrome에서 동작하도록; deprecated
	};

	// page no scroll
	const setScreenSize = () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
	};

	useEffect(() => {
		if (!window.Kakao.isInitialized()) {
			// JavaScript key를 인자로 주고 SDK 초기화
			window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
		}
		window.addEventListener("resize", setScreenSize);

		// 페이지 변경 alert
		// window.addEventListener("beforeunload", preventClose);

		return () => {
			window.removeEventListener("beforeunload", preventClose);
			window.removeEventListener("resize", setScreenSize);
		};
	}, []);

	return (
		<div className='App'>
			<Loading />
			<ToastAlert />
			{/* <AppHeader /> */}
			{/* TODO => 로그인 유지 기능 추가 필요 / 일단 무제한 로그인 */}
			{credentialToken ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
		</div>
	);
}

export default App;
