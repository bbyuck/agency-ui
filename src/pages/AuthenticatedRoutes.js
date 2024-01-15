import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import SelectMemberType from "pages/join/SelectMemberType";
import MatchMakerHome from "pages/matchmaker/MatchMakerHome";
import UserHome from "pages/user/UserHome";
import Error from "pages/error/Error";
import EnterMatchMakerName from "pages/join/EnterMatchMakerName";

import { cloneElement, createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MATCH_MAKER, NEW, USER } from "constants/memberType";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "style/transition.css";

const TempLogout = () => {
	useEffect(() => {
		localStorage.removeItem("userId");
		localStorage.removeItem("memberType");
		window.location.reload();
	});

	return <></>;
};

const Main = () => {
	const memberType = useSelector((state) => state.auth.memberType);
	const navigate = useNavigate();

	useEffect(() => {
		if (memberType === NEW) {
			navigate("/join/membertype", {
				replace: true,
				state: { animation: "next" },
			});

			return;
		}
		if (memberType === MATCH_MAKER) {
			navigate("/home/matchmaker", { replace: true });
			return;
		}
		if (memberType === USER) {
			navigate("/home/user", { replace: true });
		}
	});

	return <></>;
};

// ===============================================

function AuthenticatedRoutes() {
	const location = useLocation();
	const routes = [
		{
			name: "main",
			path: "/",
			element: <Main />,
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
		{
			name: "member-type",
			path: "/join/membertype",
			element: <SelectMemberType />,
			animation: true,
			nodeRef: createRef(),
		},
		{
			name: "match-maker-name",
			path: "/join/matchmakername",
			element: <EnterMatchMakerName />,
			animation: true,
			nodeRef: createRef(),
		},
	];

	return (
		<TransitionGroup
			className={"transition-wrapper"}
			childFactory={(child) => {
				return cloneElement(child, {
					classNames: "item",
				});
			}}>
			<CSSTransition key={location.key} classNames={"item"} timeout={1000}>
				<Routes location={location}>
					{routes.map((route) => (
						<Route
							key={route.animation ? location.key : `no-animation-route-${route.name}`}
							path={route.path}
							name={route.name}
							element={route.element}
						/>
					))}
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
}

export default AuthenticatedRoutes;
