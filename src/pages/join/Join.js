import { cloneElement, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SelectMemberCode from "./SelectMemberCode";
import EnterMatchMakerCode from "./EnterMatchMakerCode";
import LinearHeader from "components/common/header/LinearHeader";
import { useDispatch, useSelector } from "react-redux";
import { MATCH_MAKER, USER } from "constants/memberCode";

import http from "api";
import { setAlert } from "store/slice/status";
import messages from "messages";
import { GENERAL, NEXT } from "constants/buttonType";
import { authenticate, resetAuthentication } from "store/slice/auth";

function Join() {
	const { oauthId, oauthCode } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [memberCode, setMemberCode] = useState(null);
	const [matchMakerCode, setMatchMakerCode] = useState(null);

	/**
	 * common
	 */
	const [process, setProcess] = useState(1);
	const next = () => {
		if (memberCode === MATCH_MAKER) {
			matchMakerJoin();
		} else if (memberCode === USER) {
			setProcess(process + 1);
		}
	};
	const prev = () => {
		setProcess(process - 1);
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

	const matchMakerJoin = () => {
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
				console.log(error.response.data.code);
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
		<></>,

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
