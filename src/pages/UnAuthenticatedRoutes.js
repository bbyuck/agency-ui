import { Navigate, Route, Routes } from "react-router-dom";
import Login from "pages/login/Login";
import SignUp from "pages/login/SignUp";
import Auth from "pages/login/Auth";
import Error from "pages/error/Error";

function UnAuthenticatedRoutes() {
	return (
		<Routes>
			<Route path='*' element={<Login />} />
			<Route path='/auth' element={<Auth />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<SignUp />} />

			{/* 공통 라우팅 */}
			<Route path='/error' element={<Error />} />
		</Routes>
	);
}

export default UnAuthenticatedRoutes;
