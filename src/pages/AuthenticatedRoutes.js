import "style/common/Common.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Error from "pages/error/Error";

import { cloneElement, createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { MATCH_MAKER, NEW, TEMP, USER } from "constants/memberType";

import MakeProfile from "pages/user/makeprofile/MakeProfile";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Join from "pages/join/Join";
import UserHome from "./user/UserHome";
import MatchMakerHome from "./matchmaker/MatchMakerHome";

const TempLogout = () => {
	useEffect(() => {
		localStorage.removeItem("credentialToken");
		localStorage.removeItem("memberType");
		window.location.reload();
	});

	return <></>;
};

const ForceRouting = () => {
	const memberType = useSelector((state) => state.auth.memberType);
	const navigate = useNavigate();

	useEffect(() => {
		if (memberType === TEMP) {
			navigate("/join", {
				replace: true,
				state: { animation: "next" },
			});

			return;
		}
		if (memberType === MATCH_MAKER) {
			navigate("/matchmaker/home", { replace: true });
			return;
		}
		if (memberType === USER) {
			navigate("/user/home", { replace: true });
		}
	});

	return <></>;
};

// ===============================================

function AuthenticatedRoutes() {
	const location = useLocation();
	const memberType = useSelector((state) => state.auth.memberType);

	const tempRoutes = [
		{
			name: "join",
			path: "/join",
			element: <Join />,
			animation: true,
			nodeRef: createRef(),
		},
	];
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
				{memberType === "TEMP"
					? tempRoutes.map((route) => (
							<Route
								key={location.key}
								path={route.path}
								name={route.name}
								element={route.element}
							/>
					  ))
					: memberType === "USER"
					? userRoutes.map((route) => (
							<Route
								key={location.key}
								path={route.path}
								name={route.name}
								element={route.element}
							/>
					  ))
					: memberType === "MATCH_MAKER"
					? matchMakerRoutes.map((route) => (
							<Route
								key={location.key}
								path={route.path}
								name={route.name}
								element={route.element}
							/>
					  ))
					: null}
				{routes.map((route) => (
					<Route
						key={location.key}
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
