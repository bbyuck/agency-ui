import { cloneElement, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SelectMemberType from "./SelectMemberType";
import EnterMatchMakerCode from "./EnterMatchMakerCode";
import LinearHeader from "components/common/header/LinearHeader";
import { useDispatch, useSelector } from "react-redux";
import { MATCH_MAKER, NEW, USER } from "constants/memberType";

import http from "api";
import { setAlert } from "store/slice/status";
import messages from "messages";
import { GENERAL, NEXT } from "constants/buttonType";
import { authenticate, resetAuthentication } from "store/slice/auth";

function Join() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [memberType, setMemberType] = useState(null);
	const [matchMakerCode, setMatchMakerCode] = useState(null);

	/**
	 * common
	 */
	const [process, setProcess] = useState(1);
	const next = () => {
		if (memberType === MATCH_MAKER) {
			matchMakerJoin();
		} else if (memberType === USER) {
			setProcess(process + 1);
		}
	};
	const prev = () => {
		setProcess(process - 1);
	};

	/**
	 * membertype
	 */
	const selectMemberType = (memberType) => {
		setMemberType(memberType);
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

	const start = () => {
		if (memberType === MATCH_MAKER) {
			matchMakerJoin();
		} else if (memberType === USER) {
			if (!matchMakerCode) {
				if (confirmOpen) {
					userJoin();
				} else {
					setConfirmOpen(true);
				}
			} else {
				userJoin();
			}
		}
	};

	const matchMakerJoin = () => {
		http
			.post("/v1/matchmaker/join", {
				credentialToken: auth.credentialToken,
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
		http
			.post("/v1/user/join", {
				credentialToken: auth.credentialToken,
			})
			.then((response) => {
				console.log(response);
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

		<SelectMemberType
			key='join-membertype'
			next={next}
			buttonInfo={{ type: NEXT }}
			select={selectMemberType}
			data={memberType}
		/>,
		<EnterMatchMakerCode
			key='join-matchmakername'
			buttonInfo={{
				label: "가입하기",
				handler: start,
				type: GENERAL,
			}}
			init={init}
			input={inputMatchMakerCode}
			memberType={memberType}
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
