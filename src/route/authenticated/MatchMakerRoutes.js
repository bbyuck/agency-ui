import { ACTIVE, NEW, WAIT } from "constants/memberStatus";
import WaitPage from "pages/common/WaitPage";
import MatchMakerHome from "pages/matchmaker/MatchMakerHome";
import { cloneElement, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MatchMakerNew from "pages/matchmaker/MatchMakerNew";
import { MATCH_MAKER } from "constants/memberCode";
import HomeHeader from "components/common/header/HomeHeader";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MatchMakerUserList from "pages/matchmaker/MatchMakerUserList";
import "style/common/Common.css";
import memberInfo from "store/slice/memberInfo";
import { useSelector } from "react-redux";

function MatchMakerRoutes() {
	const location = useLocation();
	const navigate = useNavigate();
	const { matchMakerStatus } = useSelector((state) => state.memberInfo);

	const headerInfo = {
		"/matchmaker/home": 0,
		"/matchmaker/user": 1,
	};

	useEffect(() => {
		const activePages = ["/matchmaker/home", "/matchmaker/user"];
		switch (matchMakerStatus) {
			case NEW:
				if (location.pathname !== "/matchmaker/join") {
					navigate("/matchmaker/join", { replace: true });
				}
				break;
			case WAIT:
				if (location.pathname !== "/matchmaker/wait") {
					navigate("/matchmaker/wait", { replace: true });
				}
				break;
			case ACTIVE:
				if (!activePages.includes(location.pathname)) {
					navigate("/matchmaker/home", { replace: true });
				}
				break;
			default:
				break;
		}
	}, [matchMakerStatus, navigate, location.pathname]);

	return (
		<>
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
						<Route
							key={location.pathname}
							element={<MatchMakerHome />}
							index
							path='/matchmaker/home'
						/>
						<Route
							key={location.pathname}
							element={<MatchMakerNew className='page' approver={"관리자"} />}
							path='/matchmaker/join'
						/>
						<Route
							key={location.pathname}
							element={
								<WaitPage
									className='page'
									approver={"관리자"}
									memberCode={MATCH_MAKER}
								/>
							}
							path='/matchmaker/wait'
						/>
						<Route
							key={location.pathname}
							element={<MatchMakerUserList />}
							path='/matchmaker/user'
						/>
					</Routes>
				</CSSTransition>
				{/* <MatchMakerForceRouting /> */}
			</TransitionGroup>
		</>
	);
}

export default MatchMakerRoutes;
