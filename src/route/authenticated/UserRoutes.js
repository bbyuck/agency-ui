import { USER } from "constants/memberCode";
import {
	MATCHING,
	MATCHING_ACCEPTED,
	MATCHING_CONFIRMED,
	MATCHING_WAIT,
	NEW,
	PROFILE_MAKING,
	REQUEST_CONFIRMED,
	REQUEST_RECEIVED,
} from "constants/memberStatus";
import WaitPage from "pages/common/WaitPage";
import UserHome from "pages/user/UserHome";
import MakeProfile from "pages/user/makeprofile/MakeProfile";
import MatchingPage from "pages/user/matching/MatchingPage";
import MatchingRequestReceivedPage from "pages/user/matching/MatchingRequestReceivedPage";
import MatchingAcceptedPage from "pages/user/matching/MatchingAcceptedPage";
import MatchingWaitPage from "pages/user/matching/MatchingWaitPage";
import { createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UserForceRouting from "./UserForceRouting";
import BeAFriend from "pages/user/util/BeAFriend";

function UserRoutes() {
	const location = useLocation();
	const navigate = useNavigate();
	const { userStatus } = useSelector((state) => state.memberInfo);
	const routes = [
		{
			name: "make-profile",
			path: "/user/profile/make",
			element: <MakeProfile />,
			nodeRef: createRef(),
		},

		{
			name: "user-home",
			path: "/user/home",
			element: <UserHome />,
			nodeRef: createRef(),
		},
		{
			name: "user-join-wait",
			path: "/user/wait",
			element: <WaitPage approver={"관리자"} memberCode={USER} />,
			nodeRef: createRef(),
		},
		{
			name: "user-matching-wait",
			path: "/user/matching/wait",
			element: <MatchingWaitPage />,
			nodeRef: createRef(),
		},
		{
			name: "user-matching-request-received",
			path: "/user/matching/request/received",
			element: <MatchingRequestReceivedPage />,
			nodeRef: createRef(),
		},
		{
			name: "user-matching",
			path: "/user/matching",
			element: <MatchingPage />,
			nodeRef: createRef(),
		},
		{
			name: "user-matching-success",
			path: "/user/matching/success",
			element: <MatchingAcceptedPage />,
			nodeRef: createRef(),
		},
		{
			name: "be-a-friend",
			path: "/user/friend",
			element: <BeAFriend />,
			nodeRef: createRef(),
		},
	];

	useEffect(() => {
		if (userStatus === NEW && location.pathname !== "/user/wait") {
			navigate("/user/wait", { replace: true });
		} else if (
			userStatus === PROFILE_MAKING &&
			location.pathname !== "/user/profile/make"
		) {
			navigate("/user/profile/make", { replace: true });
		} else if (
			userStatus === MATCHING_WAIT &&
			location.pathname !== "/user/matching/wait"
		) {
			navigate("/user/matching/wait", { replace: true });
		} else if (
			(userStatus === REQUEST_RECEIVED || userStatus === REQUEST_CONFIRMED) &&
			location.pathname !== "/user/matching/request/received"
		) {
			navigate("/user/matching/request/received", { replace: true });
		} else if (userStatus === MATCHING || userStatus === MATCHING_CONFIRMED) {
			navigate("/user/matching", { replace: true });
		} else if (userStatus === MATCHING_ACCEPTED) {
			navigate("/user/matching/success", { replace: true });
		}

		// else {
		// 	navigate("/user/home", { replace: true });
		// }
	}, [userStatus, navigate, location.pathname]);

	return (
		<>
			<Routes>
				{routes.map((route) => {
					return (
						<Route
							key={location.pathname}
							path={route.path}
							name={route.name}
							element={route.element}
						/>
					);
				})}
			</Routes>
			<UserForceRouting />
		</>
	);
}

export default UserRoutes;
