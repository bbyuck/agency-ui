import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "pages/login/Login";
import SignUp from "pages/login/SignUp";
import Auth from "pages/login/Auth";
import Error from "pages/error/Error";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const DefaultRoute = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/login", { replace: true });
	});

	return <></>;
};

function UnAuthenticatedRoutes() {
	return (
		<Routes>
			<Route path='*' element={<DefaultRoute />} />
			<Route path='/auth' element={<Auth />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<SignUp />} />

			{/* 공통 라우팅 */}
			<Route path='/error' element={<Error />} />
		</Routes>
	);
}

export default UnAuthenticatedRoutes;
