import { USER } from "constants/memberCode";
import { NEW, PROFILE_MAKING } from "constants/memberStatus";
import WaitPage from "pages/common/WaitPage";
import UserHome from "pages/user/UserHome";
import MakeProfile from "pages/user/makeprofile/MakeProfile";
import { createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

function UserRoutes() {
	const location = useLocation();
	const navigate = useNavigate();
	const { memberCode, memberStatus } = useSelector((state) => state.memberInfo);
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
			name: "user-wait",
			path: "/user/wait",
			element: <WaitPage approver={"주선자"} />,
			nodeRef: createRef(),
		},
	];

	useEffect(() => {
		if (memberCode !== USER) {
			navigate("/error", { replace: true });
		} else if (memberStatus === NEW && location.pathname !== "/user/wait") {
			navigate("/user/wait", { replace: true });
		} else if (
			memberStatus === PROFILE_MAKING &&
			location.pathname !== "/user/profile/make"
		) {
			navigate("/user/profile/make", { replace: true });
		}
		// else {
		// 	navigate("/user/home", { replace: true });
		// }
	}, [memberCode, memberStatus, navigate, location.pathname]);

	return (
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
	);
}

export default UserRoutes;
