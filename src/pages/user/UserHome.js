import Main from "pages/user/main/Main";
import HomeHeader from "components/common/header/HomeHeader";
import ProfileDetail from "pages/user/main/ProfileDetail";
import { cloneElement, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ReceivedRequest from "components/common/ReceivedRequest";
import http from "api";
import { useDispatch } from "react-redux";
import { setAlert } from "store/slice/status";

function UserHome() {
	const [process, setProcess] = useState(0);
	const [selectedProfileId, setSelectedProfileId] = useState(null);
	const dispatch = useDispatch();

	const next = () => {
		setProcess(process + 1);
	};

	const prev = () => {
		setProcess(process - 1);
	};

	const to = (processId) => {
		setProcess(processId);
	};

	const select = (profile) => {
		setSelectedProfileId(profile);
		next();
	};

	const [receivedListOpen, setReceivedListOpen] = useState(false);
	const [receivedRequest, setReceivedRequest] = useState(null);

	const openReceivedList = () => {
		searchReceivedRequest()
			.then((success) => {
				if (success) {
					setReceivedListOpen(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const searchReceivedRequest = () => {
		return http
			.get("/v1/matching/request/received")
			.then((response) => {
				setReceivedRequest(response.data.data.senderProfileInfo);
				return true;
			})
			.catch((error) => {
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response.data.message,
						},
					}),
				);
				return false;
			});
	};

	const Pages = [
		<Main
			key={"user-main"}
			select={select}
			reset={() => {
				setSelectedProfileId(null);
			}}
		/>,
		<ProfileDetail
			key={"user-profile-detail"}
			selectedProfileId={selectedProfileId}
		/>,
	];

	return (
		<>
			<HomeHeader
				process={process}
				leftButton={prev}
				rightButton={openReceivedList}
			/>
			<TransitionGroup
				className={"transition-wrapper"}
				childFactory={(child) => {
					return cloneElement(child, {
						classNames: "item",
					});
				}}>
				<CSSTransition key={Pages[process].key} classNames={"item"} timeout={100}>
					<div className='page-contents'>{Pages[process]}</div>
				</CSSTransition>
			</TransitionGroup>
			<ReceivedRequest
				open={receivedListOpen}
				handleClose={() => {
					setReceivedListOpen(false);
				}}
			/>
		</>
	);
}

export default UserHome;
