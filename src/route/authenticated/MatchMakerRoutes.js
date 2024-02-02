import { MATCH_MAKER } from "constants/memberCode";
import { NEW } from "constants/memberStatus";
import WaitPage from "pages/common/WaitPage";
import MatchMakerHome from "pages/matchmaker/MatchMakerHome";
import { createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

function MatchMakerRoutes() {
	const location = useLocation();
	const navigate = useNavigate();
	const { memberCode, memberStatus } = useSelector((state) => state.memberInfo);

	const routes = [
		{
			name: "match-maker-home",
			path: "/matchmaker/home",
			element: <MatchMakerHome />,
			nodeRef: createRef(),
		},
		{
			name: "match-maker-wait",
			path: "/matchmaker/wait",
			element: <WaitPage approver={"관리자"} />,
			nodeRef: createRef(),
		},
	];

	useEffect(() => {
		if (memberCode !== MATCH_MAKER) {
			navigate("/error", { replace: true });
		} else if (memberStatus === NEW && location.pathname !== "/user/wait") {
			navigate("/user/wait", { replace: true });
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

export default MatchMakerRoutes;
