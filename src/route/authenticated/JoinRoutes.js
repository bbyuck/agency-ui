import { TEMP } from "constants/memberStatus";
import Agreement from "pages/agreement/Agreement";
import Join from "pages/join/Join";
import { createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

function JoinRoutes() {
	const location = useLocation();
	const navigate = useNavigate();
	const { userStatus, matchMakerStatus } = useSelector(
		(state) => state.memberInfo,
	);

	const routes = [
		{
			name: "agreement",
			path: "/agreement",
			element: <Agreement />,
			nodeRef: createRef(),
		},
		// {
		// 	name: "join",
		// 	path: "/join",
		// 	element: <Join />,
		// 	nodeRef: createRef(),
		// },
	];

	useEffect(() => {
		if (userStatus !== TEMP || matchMakerStatus !== TEMP) {
			navigate("/error", { replace: true });
		}
	}, [matchMakerStatus, userStatus, navigate]);

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

export default JoinRoutes;
