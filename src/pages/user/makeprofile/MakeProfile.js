import "style/transition.css";
import { cloneElement, useState } from "react";
import GenderSelect from "./GenderSelect";
import PhotoExchangeSelect from "./PhotoExchangeSelect";
import SmokingSelect from "./SmokingSelect";
import MakeProfileHeader from "components/user/makeprofile/MakeProfileHeader";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function MakeProfile() {
	const newProfileData = {
		gender: null,
		age: 0,
		height: 0,
		job: null,
		address: null,
		hobby: null,
		idealType: null,
		mbti: null,
		selfDescription: null,
		allowPhotoExchange: null,
		smoking: null,
	};

	const [process, setProcess] = useState(1);
	const next = () => {
		setProcess(process + 1);
	};
	const prev = () => {
		setProcess(process - 1);
	};

	/**
	 * gender select
	 */
	const selectGender = (gender) => {
		newProfileData.gender = gender;
	};

	const selectPhotoExchangeYn = (photoExchange) => {
		newProfileData.allowPhotoExchange = photoExchange;
	};

	const selectSmokingYn = (smoking) => {
		newProfileData.smoking = smoking;
	};

	const Pages = [
		<div>makeprofile start</div>,
		<GenderSelect
			key={"gender-select"}
			next={next}
			select={selectGender}
			data={newProfileData.gender}
		/>,
		<PhotoExchangeSelect
			key={"photo-exchange-select"}
			next={next}
			select={selectPhotoExchangeYn}
			data={newProfileData.allowPhotoExchange}
		/>,
		<SmokingSelect
			key={"smoking-select"}
			next={next}
			select={selectSmokingYn}
			data={newProfileData.smoking}
		/>,
	];

	return (
		<>
			<MakeProfileHeader prev={prev} process={process} />
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

export default MakeProfile;
