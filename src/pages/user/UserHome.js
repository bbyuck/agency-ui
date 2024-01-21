import Main from "pages/user/main/Main";
import HomeHeader from "components/common/header/HomeHeader";
import ProfileDetail from "pages/user/main/ProfileDetail";
import { cloneElement, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function UserHome() {
	const [process, setProcess] = useState(0);
	const [selectedProfileId, setSelectedProfileId] = useState(null);

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
			<HomeHeader process={process} prev={prev} />
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
