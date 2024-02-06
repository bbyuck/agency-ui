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
import { setMemberStatus, setMemberCode } from "store/slice/memberInfo";
import { scrollDisable } from "util";
import { scrollAble } from "util";

function Join() {
	const { oauthId, oauthCode } = useSelector((state) => state.auth);
	const { callbackPage } = useSelector((state) => state.status);
	const [inputMemberCode, setInputMemberCode] = useState(null);
	const [matchMakerCode, setMatchMakerCode] = useState(null);

	const [pageNum, setPageNum] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		scrollDisable();

		if (callbackPage === "KAKAO-FRIEND-SELECT") {
			setPageNum(2);
		}

		return () => {
			scrollAble();
			dispatch(resetCallBackPage());
		};
	}, [callbackPage, dispatch]);

	const next = () => {
		if (inputMemberCode === MATCH_MAKER) {
			matchMakerJoin();
		} else if (inputMemberCode === USER) {
			if (matchMakerCode) {
				setPageNum(1);
			} else {
				setPageNum(2);
			}
		}
	};
	const prev = () => {
		if (matchMakerCode) {
			setPageNum(pageNum - 1);
		} else {
			setPageNum(pageNum - 2);
		}
	};

	/**
	 * membertype
	 */
	const selectMemberCode = (inputMemberCode) => {
		setInputMemberCode(inputMemberCode);
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
		/*
			TODO - 친구 목록에 노출 허용 관련 authorize 구현
		*/
		// const authorizeParam = {
		// 	redirectUri: `${process.env.REACT_APP_CLIENT}/auth`,
		// 	scope: "friends",
		// };
		// await window.Kakao.Auth.authorize(authorizeParam);

		http
			.post("/v1/matchmaker/join", {
				oauthId: oauthId,
				oauthCode: oauthCode,
				accessToken: sessionStorage.getItem("accessToken"),
				refreshToken: sessionStorage.getItem("refreshToken"),
			})
			.then((response) => {
				dispatch(authenticate(response.data.data));
				dispatch(setMemberCode(response.data.data.memberCode));
				dispatch(setMemberStatus(response.data.data.memberStatus));
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
				dispatch(setMemberCode(response.data.data.memberCode));
				dispatch(setMemberStatus(response.data.data.memberStatus));
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "success",
							message: "가입이 완료되었습니다.\n프로필을 만들어주세요.",
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
			});
	};

	const Pages = [
		<SelectMemberCode
			key='join-membertype'
			next={next}
			buttonInfo={{ type: NEXT }}
			select={selectMemberCode}
			data={inputMemberCode}
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
			inputMemberCode={inputMemberCode}
			data={matchMakerCode}
			closeConfirmDialog={closeConfirmDialog}
		/>,
		<KakaoFriendSelect
			back={() => {
				setPageNum(0);
			}}
		/>,
	];
	return (
		<>
			<LinearHeader prev={prev} process={pageNum} />
			<TransitionGroup
				className={"transition-wrapper"}
				childFactory={(child) => {
					return cloneElement(child, {
						classNames: "item",
					});
				}}>
				<CSSTransition key={Pages[pageNum].key} classNames={"item"} timeout={1000}>
					{Pages[pageNum]}
				</CSSTransition>
			</TransitionGroup>
		</>
	);
}

export default Join;
