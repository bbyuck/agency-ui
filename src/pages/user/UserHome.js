import UserMain from "pages/user/main/UserMain";
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

	const select = (profile) => {
		setSelectedProfileId(profile);
		next();
	};

	const Pages = [
		<UserMain
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
			<HomeHeader process={process} leftButton={prev} />
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
		</>
	);
}

export default UserHome;
