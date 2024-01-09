import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./main/Main";

function AuthenticatedRoutes() {
	return (
		<Routes>
			<Route path='/*' element={<Navigate to='/main' />} />
			<Route path='/main' element={<Main />} />
		</Routes>
	);
}

export default AuthenticatedRoutes;
