import { useEffect } from "react";
import "./App.css";
import AuthenticatedRoutes from "pages/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "pages/UnAuthenticatedRoutes";
import { useSelector } from "react-redux";
import Loading from "components/common/Loading";
import ToastAlert from "components/common/ToastAlert";

function App() {
	const auth = useSelector((state) => state.auth);
	/**
	 * 로그인 시 rerender
	 */
	useEffect(() => {}, [auth]);

	if (!window.Kakao.isInitialized()) {
		// JavaScript key를 인자로 주고 SDK 초기화
		window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
	}

	return (
		<div className='App'>
			<Loading />
			<ToastAlert />
			{/* TODO => 로그인 유지 기능 추가 필요 / 일단 무제한 로그인 */}
			{localStorage.getItem("userId") ? (
				<AuthenticatedRoutes />
			) : (
				<UnAuthenticatedRoutes />
			)}
		</div>
	);
}

export default App;
