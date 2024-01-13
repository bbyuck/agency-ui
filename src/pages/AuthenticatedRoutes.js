import { Navigate, Route, Routes } from "react-router-dom";
import SelectMemberType from "pages/join/SelectMemberType";
import MatchMakerHome from "pages/matchmaker/MatchMakerHome";
import UserHome from "pages/user/UserHome";
import Error from "pages/error/Error";
import EnterMatchMakerName from "pages/join/EnterMatchMakerName";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MATCH_MAKER, USER } from "constants/memberType";

const TempLogout = () => {
	useEffect(() => {
		localStorage.removeItem("userId");
	}, []);

	return <></>;
};

function AuthenticatedRoutes() {
	const auth = useSelector((state) => state.auth);
	const joinInfo = useSelector((state) => state.joinInfo);

	useEffect(() => {}, [auth, joinInfo]);

	return (
		<Routes>
			<Route
				path='/*'
				element={
					auth.memberType === "NEW" ? (
						<Navigate to='/join' />
					) : auth.memberType === MATCH_MAKER ? (
						<Navigate to='/matchmaker/home' />
					) : auth.memberType === USER ? (
						<Navigate to='/user/home' />
					) : (
						<Navigate to='/error' />
					)
				}
			/>
			<Route path='/logout' element={<TempLogout />} />

			{/* join */}
			<Route
				path='/join'
				element={
					joinInfo.memberType ? <EnterMatchMakerName /> : <SelectMemberType />
				}
			/>

			{/* match maker routing */}
			<Route path='/matchmaker/home' element={<MatchMakerHome />} />

			{/* user routing */}
			<Route path='/user/home' element={<UserHome />} />

			{/* 공통 라우팅 */}
			<Route path='/error' element={<Error />} />
		</Routes>
	);
}

export default AuthenticatedRoutes;
