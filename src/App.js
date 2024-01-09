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

	return (
		<div className='App'>
			<Loading />
			<ToastAlert />
			{sessionStorage.getItem("accessToken") ? (
				<AuthenticatedRoutes />
			) : (
				<UnAuthenticatedRoutes />
			)}
		</div>
	);
}

export default App;
