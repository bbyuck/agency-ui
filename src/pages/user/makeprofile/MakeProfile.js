import "style/common/Common.css";
import { cloneElement, useEffect, useState } from "react";
import GenderSelect from "./GenderSelect";
import PhotoUpload from "./PhotoUpload";
import SmokingSelect from "./SmokingSelect";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LinearHeader from "components/common/header/LinearHeader";
import { GENERAL, NEXT } from "constants/buttonType";
import AgeSelect from "./AgeSelect";
import HeightSelect from "./HeightSelect";
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
import MBTISelect from "./MBTISelect";
import { getBirthYearDistance } from "util";
import { getHeightDistance } from "util";
import http from "api";

let loadedData = {
	address: null,
	age: null,
	gender: null,
	height: null,
	hobby: null,
	idealType: null,
	mbti: null,
	photoData: null,
	selfDescription: null,
	smoking: null,
};

function MakeProfile() {
	const [gender, setGender] = useState(null);
	const [age, setAge] = useState(null);
	const [height, setHeight] = useState(null);
	const [job, setJob] = useState(null);
	const [address, setAddress] = useState(null);
	const [hobby, setHobby] = useState(null);
	const [idealType, setIdealType] = useState(null);
	const [mbti, setMbti] = useState(null);
	const [selfDescription, setSelfDescription] = useState(null);
	const [smoking, setSmoking] = useState(null);
	const [photoData, setPhotoData] = useState(null);
	const [isNext, setIsNext] = useState(true);

	const selectInitData = [{ label: "선택", value: "none" }];
	const [birthYears, setBirthYears] = useState(selectInitData);
	const [heights, setHeights] = useState(selectInitData);
	const mbtiList = [
		"ISTJ",
		"ISFJ",
		"INFJ",
		"INTJ",

		"ISTP",
		"ISFP",
		"INFP",
		"INTP",

		"ESTP",
		"ESFP",
		"ENFP",
		"ENTP",

		"ESTJ",
		"ESFJ",
		"ENFJ",
		"ENTJ",
	];

	useEffect(() => {
		setBirthYears(getBirthYearDistance());
		setHeights(getHeightDistance());

		/**
		 * 중간 저장된 프로필 정보 로드
		 */
		http
			.get("/v1/user/profile/my")
			.then((response) => {
				loadedData = response.data.data;

				setAddress(loadedData.address);
				setAge(loadedData.age);
				setGender(loadedData.gender);
				setHeight(loadedData.height);
				setHobby(loadedData.hobby);
				setIdealType(loadedData.idealType);
				setMbti(loadedData.mbti);
				setPhotoData(loadedData.photoData);
				setSelfDescription(loadedData.selfDescription);
				setSmoking(loadedData.smoking);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const bindData = [
		{
			key: "gender",
			value: gender,
		},
		{
			key: "age",
			value: age,
		},
		{
			key: "address",
			value: address,
		},
		{
			key: "job",
			value: job,
		},
		{
			key: "height",
			value: height,
		},
		{
			key: "hobby",
			value: hobby,
		},
		{
			key: "mbti",
			value: mbti,
		},
		{
			key: "idealType",
			value: idealType,
		},
		{
			key: "selfDescription",
			value: selfDescription,
		},
		{
			key: "photoData",
			value: photoData,
		},
		{
			key: "smoking",
			value: smoking,
		},
	];

	const [process, setProcess] = useState(0);
	const next = async () => {
		console.log(bindData[process]);
		if (bindData[process].value !== loadedData[bindData[process].key]) {
			await saveProfile();
		}
		setProcess(process + 1);
		setIsNext(true);
	};
	const prev = async () => {
		if (bindData[process].value !== loadedData[bindData[process].key]) {
			await saveProfile();
		}
		setProcess(process - 1);
		setIsNext(false);
	};

	const saveProfile = () => {
		const param = {
			gender: gender,
			age: age,
			job: job,
			address: address,
			height: height,
			idealType: idealType,
			hobby: hobby,
			mbti: mbti,
			smoking: smoking,
			selfDescription: selfDescription,
		};

		http
			.post("/v1/user/profile/my", param)
			.then((response) => {
				console.log(response);
				loadedData = response.data.data;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	/**
	 * gender select
	 */
	const selectGender = (gender) => {
		setGender(gender);
	};

	const selectSmokingYn = (smoking) => {
		setSmoking(smoking);
	};

	const selectAge = (age) => {
		setAge(age);
	};

	const selectHeight = (height) => {
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

	const selectMBTI = (mbti) => {
		setMbti(mbti);
	};

	const makeProfile = () => {
		console.log("프로필 만들기 api 호출");
	};

	const Pages = [
		<GenderSelect
			key={"gender-select"}
			next={next}
			select={selectGender}
			buttonInfo={{ type: NEXT }}
			data={gender}
		/>,
		<AgeSelect
			key={"age-select"}
			next={next}
			select={selectAge}
			label={"출생연도"}
			buttonInfo={{ type: NEXT }}
			list={birthYears}
			data={age}
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
		<JobInput
			key={"job-input"}
			next={next}
			input={inputJob}
			label={"하는 일"}
			buttonInfo={{ type: NEXT }}
			data={job}
			limitByte={JOB}
		/>,
		<HeightSelect
			key={"height-input"}
			next={next}
			select={selectHeight}
			list={heights}
			label={"키"}
			buttonInfo={{ type: NEXT }}
			data={height}
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
		<MBTISelect
			key={"mbti-select"}
			next={next}
			select={selectMBTI}
			label={"MBTI"}
			buttonInfo={{ type: NEXT }}
			list={mbtiList}
			data={mbti}
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
		<PhotoUpload
			key={"photo-exchange-select"}
			next={next}
			buttonInfo={{ type: NEXT }}
			setPhotoData={setPhotoData}
			data={photoData}
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
						classNames: isNext ? "right-to-left" : "left-to-right",
						timeout: 1000,
					});
				}}>
				<CSSTransition
					key={Pages[process].key}
					classNames={"right-to-left"}
					timeout={1000}>
					{Pages[process]}
				</CSSTransition>
			</TransitionGroup>
		</>
	);
}

export default MakeProfile;
