import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "pages/login/Login";
import SignUp from "pages/login/SignUp";
import LoginAuth from "pages/login/LoginAuth";
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
			<Route path='/login/auth' element={<LoginAuth />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
}

export default UnAuthenticatedRoutes;
