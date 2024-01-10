import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import Auth from "pages/login/Auth";

function UnAuthenticatedRoutes() {
	return (
		<Routes>
			<Route path='*' element={<Login />} />
			<Route path='/auth' element={<Auth />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<SignUp />} />
		</Routes>
	);
}

export default UnAuthenticatedRoutes;
