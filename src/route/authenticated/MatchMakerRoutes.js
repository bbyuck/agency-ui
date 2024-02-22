import { ACTIVE, NEW, WAIT } from "constants/memberStatus";
import WaitPage from "pages/common/WaitPage";
import MatchMakerHome from "pages/matchmaker/MatchMakerHome";
import { cloneElement, createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MatchMakerForceRouting from "./MatchMakerForceRouting";
import MatchMakerNew from "pages/matchmaker/MatchMakerNew";
import { MATCH_MAKER } from "constants/memberCode";
import HomeHeader from "components/common/header/HomeHeader";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MatchMakerUserList from "pages/matchmaker/MatchMakerUserList";
import "style/common/Common.css";

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
			element: <MatchMakerNew className='page' approver={"관리자"} />,
			nodeRef: createRef(),
		},
		{
			name: "match-maker-wait",
			path: "/matchmaker/wait",
			element: (
				<WaitPage className='page' approver={"관리자"} memberCode={MATCH_MAKER} />
			),
			nodeRef: createRef(),
		},
		{
			name: "match-maker-user-list",
			path: "/matchmaker/user",
			element: <MatchMakerUserList />,
		},
	];

	const activeUrlList = ["/matchmaker/home", "/matchmaker/user"];

	useEffect(() => {
		if (matchMakerStatus === NEW && location.pathname !== "/matchmaker/join") {
			navigate("/matchmaker/join", { replace: true });
		}
		if (matchMakerStatus === WAIT && location.pathname !== "/matchmaker/wait") {
			navigate("/matchmaker/wait", { replace: true });
		}
		if (
			matchMakerStatus === ACTIVE &&
			!activeUrlList.includes(location.pathname)
		) {
			navigate("/matchmaker/home");
		}
	}, [matchMakerStatus, navigate, location.pathname]);

	const headerInfo = {
		"/matchmaker/home": 0,
		"/matchmaker/user": 1,
	};

	return (
		<>
			<HomeHeader
				leftButton={() => {
					navigate(-1);
				}}
				process={headerInfo[location.pathname]}
			/>
			<TransitionGroup
				className='transition-wrapper'
				childFactory={(child) => {
					return cloneElement(child, {
						className: "item",
						timeout: 300,
					});
				}}>
				<CSSTransition key={location.pathname} classNames={"item"} timeout={300}>
					<Routes location={location}>
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
				</CSSTransition>
				<MatchMakerForceRouting />
			</TransitionGroup>
		</>
	);
}

export default MatchMakerRoutes;
