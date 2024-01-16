import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SelectMemberType from "pages/join/SelectMemberType";
import Error from "pages/error/Error";
import EnterMatchMakerName from "pages/join/EnterMatchMakerName";

import { createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { MATCH_MAKER, NEW, USER } from "constants/memberType";

import MakeProfile from "pages/user/makeprofile/MakeProfile";

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
	}, []);

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
		{
			name: "make-profile",
			path: "/user/profile/make",
			element: <MakeProfile />,
			animation: true,
			nodeRef: createRef(),
		},
	];

	return (
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
	);
}

export default AuthenticatedRoutes;
