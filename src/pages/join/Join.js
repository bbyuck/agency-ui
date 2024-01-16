import { cloneElement, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SelectMemberType from "./SelectMemberType";
import EnterMatchMakerName from "./EnterMatchMakerName";
import LinearHeader from "components/common/header/LinearHeader";
import { useDispatch, useSelector } from "react-redux";
import { MATCH_MAKER, NEW, USER } from "constants/memberType";

import http from "api";
import { setAlert } from "store/slice/status";
import messages from "messages";

function Join() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [memberType, setMemberType] = useState(null);
	const [matchMakerName, setMatchMakerName] = useState(null);

	/**
	 * common
	 */
	const [process, setProcess] = useState(1);
	const next = () => {
		setProcess(process + 1);
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
	 * matchMakerName
	 */
	const [confirmOpen, setConfirmOpen] = useState(false);
	const inputMatchMakerName = (matchMakerName) => {
		setMatchMakerName(matchMakerName);
	};
	const closeConfirmDialog = () => {
		setConfirmOpen(false);
	};

	const start = () => {
		if (memberType === MATCH_MAKER) {
			matchMakerJoin();
		} else if (memberType === USER) {
			if (!matchMakerName) {
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
				kakaoId: auth.kakaoId,
				matchMakerName: matchMakerName,
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
			});
	};
	const userJoin = () => {
		http
			.post("/v1/user/join", {
				kakaoId: auth.kakaoId,
				matchMakerName: matchMakerName,
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
			});
	};

	const Pages = [
		<></>,

		<SelectMemberType
			key='join-membertype'
			next={next}
			select={selectMemberType}
			data={memberType}
		/>,
		<EnterMatchMakerName
			key='join-matchmakername'
			confirm={start}
			input={inputMatchMakerName}
			memberType={memberType}
			data={matchMakerName}
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
