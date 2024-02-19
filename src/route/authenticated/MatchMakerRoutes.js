import { ACTIVE, NEW, WAIT } from "constants/memberStatus";
import WaitPage from "pages/common/WaitPage";
import MatchMakerHome from "pages/matchmaker/MatchMakerHome";
import { createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MatchMakerForceRouting from "./MatchMakerForceRouting";
import MatchMakerJoin from "pages/matchmaker/MatchMakerJoin";
import { MATCH_MAKER } from "constants/memberCode";

function MatchMakerRoutes() {
	const location = useLocation();
	const navigate = useNavigate();
	const { matchMakerStatus } = useSelector((state) => state.memberInfo);

	const routes = [
		{
			name: "match-maker-home",
			path: "/matchmaker/home",
			element: <MatchMakerHome />,
			nodeRef: createRef(),
		},
		{
			name: "match-maker-join",
			path: "/matchmaker/join",
			element: <MatchMakerJoin approver={"관리자"} />,
			nodeRef: createRef(),
		},
		{
			name: "match-maker-wait",
			path: "/matchmaker/wait",
			element: <WaitPage approver={"관리자"} memberCode={MATCH_MAKER} />,
			nodeRef: createRef(),
		},
	];

	useEffect(() => {
		if (matchMakerStatus === NEW && location.pathname !== "/matchmaker/join") {
			navigate("/matchmaker/join", { replace: true });
		}
		if (matchMakerStatus === WAIT && location.pathname !== "/matchmaker/wait") {
			navigate("/matchmaker/wait", { replace: true });
		}
		if (matchMakerStatus === ACTIVE && location.pathname !== "/matchmaker/home") {
			navigate("/matchmaker/home");
		}
	}, [matchMakerStatus, navigate, location.pathname]);

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
			<MatchMakerForceRouting />
		</>
	);
}

export default MatchMakerRoutes;
