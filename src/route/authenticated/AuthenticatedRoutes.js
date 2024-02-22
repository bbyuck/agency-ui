import "style/common/Common.css";

import { Route, Routes, useLocation } from "react-router-dom";

import { createRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import http from "api";

import Auth from "pages/common/Auth";
import Error from "pages/error/Error";
import {
	setAlert,
	setMatchingCancel,
	setMatchingSuccess,
	setRequestAccepted,
	setRequestReceivedDialogOpen,
	setRequestRejected,
} from "store/slice/status";
import { setSendMessage, setSocketConnected } from "store/slice/websocket";
import RequestReceivedConfirm from "components/user/RequestReceivedConfirm";
import RequestRejectedAlert from "components/user/RequestRejectedAlert";
import {
	MATCHING_CANCEL,
	MATCHING_SUCCESS,
	REQUEST_ACCEPTED,
	REQUEST_RECEIVED,
	REQUEST_REJECTED,
} from "constants/clientMessageCode";
import RequestAcceptedAlert from "components/user/RequestAcceptedAlert";
import messages from "messages";
import MatchingSuccessAlert from "components/user/MatchingSuccessAlert";
import MatchingCancelAlert from "components/user/MatchingCancelAlert";
import HomeTabs from "components/common/MainTabs";
import { setMatchMakerStatus, setUserStatus } from "store/slice/memberInfo";
import { TEMP } from "constants/memberStatus";
import CommonForceRouting from "./CommonForceRouting";
import Agreement from "pages/agreement/Agreement";
// ===============================================

function AuthenticatedRoutes() {
	const location = useLocation();
	const { credentialToken } = useSelector((state) => state.auth);
	const { userStatus, matchMakerStatus } = useSelector(
		(state) => state.memberInfo,
	);
	const dispatch = useDispatch();
	/**
	 * WebSocket 관련 변수
	 */
	const ws = useRef(null);
	const { socketConnected, sendMessage } = useSelector(
		(state) => state.websocket,
	);

	const defaultRoutes = [
		{
			name: "default",
			path: "/*",
			element: <CommonForceRouting />,
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
		{
			name: "agreement",
			path: "/agreement",
			element: <Agreement />,
			nodeRef: createRef(),
		},
	];

	const alertDialogs = [
		{
			name: "request-received-alert",
			element: <RequestReceivedConfirm />,
		},
		{
			name: "request-rejected-alert",
			element: <RequestRejectedAlert />,
		},
		{
			name: "request-accepted-alert",
			element: <RequestAcceptedAlert />,
		},
		{
			name: "matching-success-alert",
			element: <MatchingSuccessAlert />,
		},
		{
			name: "matching-cancel-alert",
			element: <MatchingCancelAlert />,
		},
	];

	useEffect(() => {
		// websocket 연결
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
			ws.current.onmessage = (e) => {
				console.log(e);

				const response = JSON.parse(e.data);
				if (response.type === "CONNECT") {
					sessionStorage.setItem("wsSessionId", response.sessionId);
					http.post("/v1/ws/session/register", {
						credentialToken: credentialToken,
						sessionId: response.sessionId,
					});
				} else if (response.type === REQUEST_RECEIVED.key) {
					dispatch(setRequestReceivedDialogOpen(true));
				} else if (response.type === REQUEST_REJECTED.key) {
					dispatch(setRequestRejected(true));
				} else if (response.type === REQUEST_ACCEPTED.key) {
					dispatch(setRequestAccepted(true));
				} else if (response.type === MATCHING_CANCEL.key) {
					dispatch(setMatchingCancel(true));
				} else if (response.type === MATCHING_SUCCESS.key) {
					dispatch(setMatchingSuccess(true));
				}
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
		http
			.get("/v1/user/info/my")
			.then((response) => {
				dispatch(setUserStatus(response.data.data.userDto.userStatus));
			})
			.catch((error) => {
				console.log(error);
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response.data.message
								? error.response.data.message
								: messages.error.connect_to_server,
						},
					}),
				);
			});
		http
			.get("/v1/matchmaker/info/my")
			.then((response) => {
				dispatch(
					setMatchMakerStatus(response.data.data.matchMakerDto.matchMakerStatus),
				);
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
	}, [userStatus, matchMakerStatus, dispatch]);

	const essentialNotAgreed = () => {
		return userStatus === TEMP && matchMakerStatus === TEMP;
	};

	return (
		<>
			{essentialNotAgreed() ? null : <HomeTabs />}
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
			{alertDialogs.map((alertDialog) => {
				return <div key={alertDialog.name}>{alertDialog.element}</div>;
			})}
		</>
	);
}

export default AuthenticatedRoutes;
