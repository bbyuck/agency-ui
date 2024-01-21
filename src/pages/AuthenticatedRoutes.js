import "style/common/Common.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Error from "pages/error/Error";

import { cloneElement, createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { MATCH_MAKER, NEW, USER } from "constants/memberType";

import MakeProfile from "pages/user/makeprofile/MakeProfile";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Join from "pages/join/Join";
import UserHome from "./user/UserHome";

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
	const routes = [
		{
			name: "any",
			path: "/*",
			element: <Main />,
			animation: false,
			nodeRef: createRef(),
		},
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
			name: "join",
			path: "/join",
			element: <Join />,
			animation: true,
			nodeRef: createRef(),
		},
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

	return (
		<>
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
								key={location.key}
								path={route.path}
								name={route.name}
								element={route.element}
							/>
						))}
					</Routes>
				</CSSTransition>
			</TransitionGroup>
		</>
	);
}

export default AuthenticatedRoutes;
