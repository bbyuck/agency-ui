import { TEMP, USER } from "constants/memberCode";
import WaitPage from "pages/common/WaitPage";
import UserHome from "pages/user/UserHome";
import MakeProfile from "pages/user/makeprofile/MakeProfile";
import MatchingPage from "pages/user/matching/MatchingPage";
import MatchingRequestReceivedPage from "pages/user/matching/MatchingRequestReceivedPage";
import MatchingAcceptedPage from "pages/user/matching/MatchingAcceptedPage";
import MatchingWaitPage from "pages/user/matching/MatchingWaitPage";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import BeAFriend from "pages/user/util/BeAFriend";
import UserNew from "pages/user/main/UserNew";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	ACTIVE,
	MATCHING,
	MATCHING_ACCEPTED,
	MATCHING_CONFIRMED,
	MATCHING_WAIT,
	NEW,
	PROFILE_MAKING,
	REQUEST_CONFIRMED,
	REQUEST_RECEIVED,
	WAIT,
} from "constants/memberStatus";

function UserRoutes() {
	const location = useLocation();
	const navigate = useNavigate();
	const { userStatus } = useSelector((state) => state.memberInfo);

	useEffect(() => {
		switch (userStatus) {
			case TEMP:
				if (location.pathname !== "/agreement") {
					navigate("/agreement", { replace: true });
				}
				break;
			case NEW:
				if (location.pathname !== "/user/new") {
					navigate("/user/new", { replace: true });
				}
				break;
			case PROFILE_MAKING:
				if (location.pathname !== "/user/profile/make") {
					navigate("/user/profile/make", { replace: true });
				}
				break;
			case ACTIVE:
				if (location.pathname !== "/user/home") {
					navigate("/user/home", { replace: true });
				}
				break;
			case WAIT:
				if (location.pathname !== "/user/wait") {
					navigate("/user/wait", { replace: true });
				}
				break;
			case MATCHING_WAIT:
				if (location.pathname !== "/user/matching/wait") {
					navigate("/user/matching/wait");
				}
				break;
			case REQUEST_CONFIRMED:
			case REQUEST_RECEIVED:
				if (location.pathname !== "/user/matching/request/received") {
					navigate("/user/matching/request/received");
				}
				break;
			case MATCHING:
			case MATCHING_CONFIRMED:
				if (location.pathname !== "/user/matching") {
					navigate("/user/matching");
				}
				break;
			case MATCHING_ACCEPTED:
				if (location.pathname !== "/user/matching/success") {
					navigate("/user/matching/success");
				}
				break;
			default:
				break;
		}
	}, [userStatus, navigate]);

	return (
		<>
			<Routes>
				<Route key={location.pathname} element={<UserNew />} path='/user/new' />
				<Route
					key={location.pathname}
					element={<MakeProfile />}
					path='/user/profile/make'
				/>
				<Route
					key={location.pathname}
					element={<UserHome />}
					path='/user/home'
					index
				/>
				<Route
					key={location.pathname}
					element={<WaitPage approver={"관리자"} memberCode={USER} />}
					path='/user/wait'
				/>
				<Route
					key={location.pathname}
					path='/user/matching/wait'
					element={<MatchingWaitPage />}
				/>
				<Route
					key={location.pathname}
					path='/user/matching/request/received'
					element={<MatchingRequestReceivedPage />}
				/>
				<Route
					key={location.pathname}
					path='/user/matching'
					element={<MatchingPage />}
				/>
				<Route
					key={location.pathname}
					path='/user/matching/success'
					element={<MatchingAcceptedPage />}
				/>
				<Route
					key={location.pathname}
					path='/user/friend'
					element={<BeAFriend />}
				/>
			</Routes>
		</>
	);
}

export default UserRoutes;
