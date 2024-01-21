import Main from "pages/user/main/Main";
import HomeHeader from "components/common/header/HomeHeader";
import ProfileDetail from "pages/user/main/ProfileDetail";
import { cloneElement, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ReceivedRequest from "components/common/ReceivedRequest";

function UserHome() {
	const [process, setProcess] = useState(0);
	const [selectedProfileId, setSelectedProfileId] = useState(null);

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

	const openReceivedList = () => {
		setReceivedListOpen(true);
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
