import { cloneElement, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SelectMemberCode from "./SelectMemberCode";
import EnterMatchMakerCode from "./EnterMatchMakerCode";
import LinearHeader from "components/common/header/LinearHeader";
import { useDispatch, useSelector } from "react-redux";
import { MATCH_MAKER, USER } from "constants/memberCode";

import http from "api";
import { resetCallBackPage, setAlert } from "store/slice/status";
import messages from "messages";
import { GENERAL, NEXT } from "constants/buttonType";
import { authenticate, resetAuthentication } from "store/slice/auth";
import KakaoFriendSelect from "./KakaoFriendSelect";

function Join() {
	const { oauthId, oauthCode } = useSelector((state) => state.auth);
	const { callbackPage } = useSelector((state) => state.status);
	const [memberCode, setMemberCode] = useState(null);
	const [matchMakerCode, setMatchMakerCode] = useState(null);

	const [process, setProcess] = useState(0);

	const dispatch = useDispatch();

	useEffect(() => {
		if (callbackPage === "KAKAO-FRIEND-SELECT") {
			setProcess(2);
		}

		return () => {
			dispatch(resetCallBackPage());
		};
	}, []);

	const next = () => {
		if (memberCode === MATCH_MAKER) {
			matchMakerJoin();
		} else if (memberCode === USER) {
			if (matchMakerCode) {
				setProcess(1);
			} else {
				setProcess(2);
			}
		}
	};
	const prev = () => {
		if (matchMakerCode) {
			setProcess(process - 1);
		} else {
			setProcess(process - 2);
		}
	};

	/**
	 * membertype
	 */
	const selectMemberCode = (memberCode) => {
		setMemberCode(memberCode);
	};

	/**
	 * matchMakerCode
	 */
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [init, setInit] = useState(true);

	const inputMatchMakerCode = (matchMakerCode) => {
		if (init) {
			setInit(false);
		}
		setMatchMakerCode(matchMakerCode);
	};

	if (init) {
		inputMatchMakerCode(sessionStorage.getItem("mc"));
	}

	const closeConfirmDialog = () => {
		setConfirmOpen(false);
	};

	const matchMakerJoin = async () => {
		await window.Kakao.Auth.authorize({
			redirectUri: `${process.env.REACT_APP_CLIENT}/auth`,
			scope: "friends",
		});

		http
			.post("/v1/matchmaker/join", {
				oauthId: oauthId,
				oauthCode: oauthCode,
				accessToken: sessionStorage.getItem("accessToken"),
				refreshToken: sessionStorage.getItem("refreshToken"),
			})
			.then((response) => {
				dispatch(authenticate(response.data.data));
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "success",
							message: "가입이 완료되었습니다.",
						},
					}),
				);
			})
			.catch((error) => {
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response
								? error.response.data.message
								: messages.error.connect_to_server,
						},
					}),
				);
				if (error.response.data.code === "INVALID_CREDENTIAL_TOKEN") {
					dispatch(resetAuthentication());
				}
			});
	};
	const userJoin = () => {
		const param = {
			oauthId: oauthId,
			oauthCode: oauthCode,
			matchMakerCode: matchMakerCode,
		};
		http
			.post("/v1/user/join", param)
			.then((response) => {
				dispatch(authenticate(response.data.data));
			})
			.catch((error) => {
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response
								? error.response.data.message
								: messages.error.connect_to_server,
						},
					}),
				);
				if (error.response.data.code === "INVALID_CREDENTIAL_TOKEN") {
					dispatch(resetAuthentication());
				}
			});
	};

	const Pages = [
		<SelectMemberCode
			key='join-membertype'
			next={next}
			buttonInfo={{ type: NEXT }}
			select={selectMemberCode}
			data={memberCode}
		/>,
		<EnterMatchMakerCode
			key='join-matchmakername'
			buttonInfo={{
				label: "가입하기",
				handler: userJoin,
				type: GENERAL,
			}}
			init={init}
			input={inputMatchMakerCode}
			memberCode={memberCode}
			data={matchMakerCode}
			closeConfirmDialog={closeConfirmDialog}
		/>,
		<KakaoFriendSelect
			back={() => {
				setProcess(0);
			}}
		/>,
	];
	return (
		<>
			<LinearHeader prev={prev} process={process} />
			<TransitionGroup
				className={"transition-wrapper"}
				childFactory={(child) => {
					return cloneElement(child, {
						classNames: "item",
					});
				}}>
				<CSSTransition key={Pages[process].key} classNames={"item"} timeout={1000}>
					{Pages[process]}
				</CSSTransition>
			</TransitionGroup>
		</>
	);
}

export default Join;
