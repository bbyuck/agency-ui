import "style/transition.css";
import { cloneElement, useEffect, useState } from "react";
import GenderSelect from "./GenderSelect";
import PhotoExchangeSelect from "./PhotoExchangeSelect";
import SmokingSelect from "./SmokingSelect";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LinearHeader from "components/common/header/LinearHeader";
import { GENERAL, NEXT } from "constants/buttonType";
import AgeSelect from "./AgeSelect";
import HeightInput from "./HeightInput";
import AddressInput from "./AddressInput";
import {
	ADDRESS,
	HOBBY,
	IDEAL_TYPE,
	JOB,
	SELF_DESCRIPTION,
} from "constants/inputByteLimit";
import HobbyInput from "./HobbyInput";
import JobInput from "./JobInput";
import SelfDescriptionInput from "./SelfDescriptionInput";
import IdealTypeInput from "./IdealTypeInput";
import { getBirthYears } from "util";

function MakeProfile() {
	const [gender, setGender] = useState(null);
	const [age, setAge] = useState(0);
	const [height, setHeight] = useState(null);
	const [job, setJob] = useState(null);
	const [address, setAddress] = useState(null);
	const [hobby, setHobby] = useState(null);
	const [idealType, setIdealType] = useState(null);
	const [mbti, setMbti] = useState(null);
	const [selfDescription, setSelfDescription] = useState(null);
	const [allowPhotoExchange, setAllowPhotoExchange] = useState(null);
	const [smoking, setSmoking] = useState(null);

	const newProfileData = {
		gender: null,
		age: null,
		height: null,
		job: null,
		address: null,
		hobby: null,
		idealType: null,
		mbti: null,
		selfDescription: null,
		allowPhotoExchange: null,
		smoking: null,
	};
	const birthYears = getBirthYears();

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
		setGender(gender);
	};

	const selectPhotoExchangeYn = (photoExchange) => {
		setAllowPhotoExchange(photoExchange);
	};

	const selectSmokingYn = (smoking) => {
		setSmoking(smoking);
	};

	const selectAge = (age) => {
		setAge(age);
	};

	const inputHeight = (height) => {
		setHeight(height);
	};

	const inputAddress = (address) => {
		setAddress(address);
	};

	const inputHobby = (hobby) => {
		setHobby(hobby);
	};

	const inputJob = (job) => {
		setJob(job);
	};

	const inputSelfDescription = (selfDescription) => {
		setSelfDescription(selfDescription);
	};

	const inputIdealType = (idealType) => {
		setIdealType(idealType);
	};

	const makeProfile = () => {
		console.log("프로필 만들기 api 호출");
	};

	const Pages = [
		<div>makeprofile start</div>,
		<AgeSelect
			key={"age-input"}
			next={next}
			select={selectAge}
			label={"출생연도"}
			buttonInfo={{ type: NEXT }}
			list={birthYears}
			data={age}
		/>,
		<IdealTypeInput
			key={"ideal-type-input"}
			next={next}
			input={inputIdealType}
			label={"원하는 이성상"}
			buttonInfo={{ type: NEXT }}
			data={idealType}
			limitByte={IDEAL_TYPE}
		/>,
		<SelfDescriptionInput
			key={"self-description-input"}
			next={next}
			input={inputSelfDescription}
			label={"간단 소개"}
			buttonInfo={{ type: NEXT }}
			data={selfDescription}
			limitByte={SELF_DESCRIPTION}
		/>,
		<JobInput
			key={"job-input"}
			next={next}
			input={inputJob}
			label={"하는 일"}
			buttonInfo={{ type: NEXT }}
			data={job}
			limitByte={JOB}
		/>,
		<HobbyInput
			key={"hobby-input"}
			next={next}
			input={inputHobby}
			label={"취미"}
			buttonInfo={{ type: NEXT }}
			data={hobby}
			limitByte={HOBBY}
		/>,
		<AddressInput
			key={"address-input"}
			next={next}
			input={inputAddress}
			label={"사는 곳"}
			buttonInfo={{ type: NEXT }}
			data={address}
			limitByte={ADDRESS}
		/>,
		<HeightInput
			key={"height-input"}
			next={next}
			input={inputHeight}
			label={"키"}
			buttonInfo={{ type: NEXT }}
			data={height}
		/>,
		<GenderSelect
			key={"gender-select"}
			next={next}
			select={selectGender}
			buttonInfo={{ type: NEXT }}
			data={gender}
		/>,
		<PhotoExchangeSelect
			key={"photo-exchange-select"}
			next={next}
			select={selectPhotoExchangeYn}
			buttonInfo={{ type: NEXT }}
			data={allowPhotoExchange}
		/>,
		<SmokingSelect
			key={"smoking-select"}
			next={next}
			select={selectSmokingYn}
			buttonInfo={{ label: "프로필 만들기", handler: makeProfile, type: GENERAL }}
			data={smoking}
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

export default MakeProfile;
