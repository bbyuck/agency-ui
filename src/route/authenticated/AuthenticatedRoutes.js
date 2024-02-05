import "style/common/Common.css";

import { Route, Routes, useLocation } from "react-router-dom";

import { createRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MATCH_MAKER, TEMP, USER } from "constants/memberCode";

import http from "api";

import Auth from "pages/common/Auth";
import MatchMakerRoutes from "./MatchMakerRoutes";
import UserRoutes from "./UserRoutes";
import JoinRoutes from "./JoinRoutes";
import Error from "pages/error/Error";
import { setMemberCode, setMemberStatus } from "store/slice/memberInfo";
import { setAlert } from "store/slice/status";
import ForceRouting from "./ForceRouting";
import {
	setItems,
	setSendMessage,
	setSocketConnected,
} from "store/slice/websocket";
// ===============================================

function AuthenticatedRoutes() {
	const location = useLocation();
	const { credentialToken } = useSelector((state) => state.auth);
	const { memberCode, memberStatus } = useSelector((state) => state.memberInfo);
	const dispatch = useDispatch();
	/**
	 * WebSocket 관련 변수
	 */
	const ws = useRef(null);
	const { socketConnected, sendMessage } = useSelector(
		(state) => state.websocket,
	);

	/**
	 * member type에 따른 라우팅
	 */

	const defaultRoutes = [
		{
			name: "default",
			path: "/*",
			element: <ForceRouting />,
			nodeRef: createRef(),
		},
		{
			name: "auth",
			path: "/auth",
			element: <Auth />,
			nodeRef: createRef(),
		},
		{
			name: "error",
			path: "/error",
			element: <Error />,
			nodeRef: createRef(),
		},
	];

	useEffect(() => {
		// wet socket 연결
		if (!ws.current) {
			ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET);
			ws.current.onopen = () => {
				console.log(`connected to ${process.env.REACT_APP_WEBSOCKET}`);
				dispatch(setSocketConnected(true));
			};
			ws.current.onclose = () => {
				console.log(`disconnect from ${process.env.REACT_APP_WEBSOCKET}`);
				dispatch(setSocketConnected(false));
			};
			ws.current.onerror = (error) => {
				console.log(error);
			};
		}
		return () => {
			/**
			 * websocket close
			 */
			ws.current.close();
		};
	}, []);

	useEffect(() => {
		if (socketConnected) {
			ws.current.send(
				JSON.stringify({
					credentialToken: credentialToken,
					type: "CONNECT",
				}),
			);

			dispatch(setSendMessage(true));
		}
	}, [socketConnected]);

	useEffect(() => {
		if (sendMessage) {
			ws.current.onmessage = (e) => {
				console.log(JSON.parse(e.data));
			};
		}
	}, [sendMessage]);

	useEffect(() => {
		if (memberStatus === null) {
			if (memberCode === USER) {
				http
					.get("/v1/user/info/my")
					.then((response) => {
						dispatch(setMemberCode(response.data.data.userDto.memberCode));
						dispatch(setMemberStatus(response.data.data.userDto.memberStatus));
					})
					.catch((error) => {
						console.log(error);
						dispatch(
							setAlert({
								alert: {
									open: true,
									type: "error",
									message: error.response.data.message,
								},
							}),
						);
					});
			} else if (memberCode === MATCH_MAKER) {
				http
					.get("/v1/matchmaker/info/my")
					.then((response) => {
						dispatch(setMemberCode(response.data.data.matchMakerDto.memberCode));
						dispatch(setMemberStatus(response.data.data.matchMakerDto.memberStatus));
					})
					.catch((error) => {
						console.log(error);
						dispatch(
							setAlert({
								alert: {
									open: true,
									type: "error",
									message: error.response.data.message,
								},
							}),
						);
					});
			}
		}
	}, [memberCode, memberStatus, dispatch]);

	return (
		<>
			{memberCode === MATCH_MAKER ? <MatchMakerRoutes /> : null}
			{memberCode === USER ? <UserRoutes /> : null}
			{memberCode === TEMP ? <JoinRoutes /> : null}
			<Routes location={location}>
				{defaultRoutes.map((route) => {
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
		</>
	);
}

export default AuthenticatedRoutes;
