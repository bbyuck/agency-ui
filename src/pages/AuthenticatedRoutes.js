import "style/common/Common.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Error from "pages/error/Error";

import { cloneElement, createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { MATCH_MAKER, TEMP, USER } from "constants/memberCode";
import { NEW, ACTIVE, PROFILE_MAKING } from "constants/memberStatus";

import MakeProfile from "pages/user/makeprofile/MakeProfile";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Join from "pages/join/Join";
import UserHome from "pages/user/UserHome";
import MatchMakerHome from "pages/matchmaker/MatchMakerHome";
import Agreement from "pages/agreement/Agreement";
import WaitPage from "./common/WaitPage";

const TempLogout = () => {
	useEffect(() => {
		localStorage.removeItem("credentialToken");
		localStorage.removeItem("memberCode");
		window.location.reload();
	});

	return <></>;
};

const ForceRouting = () => {
	const memberCode = useSelector((state) => state.auth.memberCode);
	const memberStatus = useSelector((state) => state.auth.memberStatus);

	const navigate = useNavigate();

	useEffect(() => {
		if (memberStatus === TEMP && memberStatus === TEMP) {
			navigate("/agreement", { replace: true });
			return;
		}

		if (memberCode === TEMP && memberStatus === NEW) {
			navigate("/join", {
				replace: true,
				state: { animation: "next" },
			});

			return;
		}

		if (memberCode === MATCH_MAKER && memberStatus === NEW) {
			navigate("/matchmaker/wait", { replace: true });
			return;
		}
		if (memberCode === USER && memberStatus === NEW) {
			navigate("/user/wait", { replace: true });
			return;
		}
		if (memberCode === USER && memberStatus === PROFILE_MAKING) {
			navigate("/user/profile/make", { replace: true });
		}

		if (memberCode === MATCH_MAKER && memberStatus === ACTIVE) {
			navigate("/matchmaker/home", { replace: true });
			return;
		}
		if (memberCode === USER && memberStatus === ACTIVE) {
			navigate("/user/home", { replace: true });
			return;
		}
	});

	return <></>;
};

// ===============================================

function AuthenticatedRoutes() {
	const location = useLocation();
	const memberCode = useSelector((state) => state.auth.memberCode);
	const memberStatus = useSelector((state) => state.auth.memberStatus);

	useEffect(() => {
		console.log(location);
	});

	/**
	 * member type에 따른 라우팅
	 */
	const tempRoutes = [
		{
			name: "agreement",
			path: "/agreement",
			element: <Agreement />,
			animation: true,
			nodeRef: createRef(),
		},
		{
			name: "join",
			path: "/join",
			element: <Join />,
			animation: true,
			nodeRef: createRef(),
		},
	];

	const userWaitRoute = {
		name: "user-wait",
		path: "/user/wait",
		element: <WaitPage approver={"주선자"} />,
		animation: true,
		nodeRef: createRef(),
	};
	const matchMakerWaitRoute = {
		name: "match-maker-wait",
		path: "/matchmaker/wait",
		element: <WaitPage approver={"관리자"} />,
		animation: true,
		nodeRef: createRef(),
	};

	const userRoutes = [
		{
			name: "make-profile",
			path: "/user/profile/make",
			element: <MakeProfile />,
			animation: true,
			nodeRef: createRef(),
		},

		{
			name: "user-home",
			path: "/user/home",
			element: <UserHome />,
			animation: true,
			nodeRef: createRef(),
		},
	];
	const matchMakerRoutes = [
		{
			name: "match-maker-home",
			path: "/matchmaker/home",
			element: <MatchMakerHome />,
			animation: true,
			nodeRef: createRef(),
		},
	];

	const routes = [
		{
			name: "any",
			path: "/*",
			element: <ForceRouting />,
			animation: false,
			nodeRef: createRef(),
		},
		{
			name: "logout",
			path: "/logout",
			element: <TempLogout />,
			animation: false,
			nodeRef: createRef(),
		},
	];

	return (
		<>
			<Routes location={location}>
				{memberCode === TEMP ? (
					tempRoutes.map((route) => (
						<Route
							key={location.pathname}
							path={route.path}
							name={route.name}
							element={route.element}
						/>
					))
				) : memberStatus === NEW ? (
					memberCode === USER ? (
						<Route
							key={location.pathname}
							path={userWaitRoute.path}
							name={userWaitRoute.name}
							element={userWaitRoute.element}
						/>
					) : memberCode === MATCH_MAKER ? (
						<Route
							key={location.pathname}
							path={matchMakerWaitRoute.path}
							name={matchMakerWaitRoute.name}
							element={matchMakerWaitRoute.element}
						/>
					) : null
				) : memberCode === USER ? (
					userRoutes.map((route) => (
						<Route
							key={location.pathname}
							path={route.path}
							name={route.name}
							element={route.element}
						/>
					))
				) : memberCode === MATCH_MAKER ? (
					matchMakerRoutes.map((route) => (
						<Route
							key={location.pathname}
							path={route.path}
							name={route.name}
							element={route.element}
						/>
					))
				) : null}
				{routes.map((route) => (
					<Route
						key={location.pathname}
						path={route.path}
						name={route.name}
						element={route.element}
					/>
				))}
			</Routes>
		</>
	);
}

export default AuthenticatedRoutes;
