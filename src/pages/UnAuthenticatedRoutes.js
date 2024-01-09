import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./login/SignUp";

function UnAuthenticatedRoutes() {
	return (
		<Routes>
			<Route path='/*' element={<Navigate to='/login' />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<SignUp />} />
		</Routes>
	);
}

export default UnAuthenticatedRoutes;
