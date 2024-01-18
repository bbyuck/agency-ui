import "style/transition.css";
import { cloneElement, useState } from "react";
import GenderSelect from "./GenderSelect";
import PhotoExchangeSelect from "./PhotoExchangeSelect";
import SmokingSelect from "./SmokingSelect";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LinearHeader from "components/common/header/LinearHeader";
import AgeInput from "./AgeInput";
import { GENERAL, NEXT } from "constants/buttonType";
import HeightInput from "./HeightInput";

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

	const inputAge = (age) => {
		setAge(age);
	};

	const inputHeight = (height) => {
		setHeight(height);
	};

	const makeProfile = () => {
		console.log("프로필 만들기 api 호출");
	};

	const Pages = [
		<div>makeprofile start</div>,
		<HeightInput
			key={"height-input"}
			next={next}
			input={inputHeight}
			label={"키"}
			buttonInfo={{ type: NEXT }}
			data={height}
		/>,
		<AgeInput
			key={"age-input"}
			next={next}
			input={inputAge}
			label={"출생연도"}
			buttonInfo={{ type: NEXT }}
			data={age}
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
