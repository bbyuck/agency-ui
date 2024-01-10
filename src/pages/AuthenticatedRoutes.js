import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./main/Main";
import { useEffect } from "react";

const TempLogout = () => {
	useEffect(() => {
		localStorage.removeItem("userId");
	}, []);

	return <></>;
};

function AuthenticatedRoutes() {
	return (
		<Routes>
			<Route path='/*' element={<Navigate to='/main' />} />
			<Route path='/main' element={<Main />} />
			<Route path='/logout' element={<TempLogout />} />
		</Routes>
	);
}

export default AuthenticatedRoutes;
