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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlert } from "store/slice/status";
import { scrollDisable } from "util";
import { scrollAble } from "util";
import { setUserStatus } from "store/slice/memberInfo";
import { addLev, initLev, subLev } from "store/slice/page";

let loadedData = {
	address: null,
	age: null,
	gender: null,
	job: null,
	height: null,
	hobby: null,
	idealType: null,
	mbti: null,
	photoInfo: null,
	selfDescription: null,
	smoking: null,
};

function MakeProfile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { lev, isNext } = useSelector((state) => state.page);
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
	const selectInitData = [{ label: "선택", value: "none" }];
	const [photoUploadInit, setPhotoUploadInit] = useState(true);
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
		scrollDisable();

		setBirthYears(getBirthYearDistance());
		setHeights(getHeightDistance());

		/**
		 * 중간 저장된 프로필 정보 로드
		 */
		http
			.get("/v1/user/profile/my")
			.then((response) => {
				loadedData = response.data.data;
				console.log(loadedData.gender);
				setAddress(loadedData.address);
				setAge(loadedData.age);
				setJob(loadedData.job);
				setGender(loadedData.gender);
				setHeight(loadedData.height);
				setHobby(loadedData.hobby);
				setIdealType(loadedData.idealType);
				setMbti(loadedData.mbti);
				setSelfDescription(loadedData.selfDescription);
				setSmoking(loadedData.smoking);
			})
			.catch((error) => {
				console.log(error);
			});
		return () => {
			scrollAble();
			sessionStorage.removeItem("photoData");
			dispatch(initLev());
		};
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
			key: "photoInfo",
			value: null,
		},
		{
			key: "smoking",
			value: smoking,
		},
	];
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
			smoking: smoking === "1",
			selfDescription: selfDescription,
		};

		http
			.post("/v1/user/profile/my", param)
			.then((response) => {
				loadedData = response.data.data;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		const idx = isNext ? lev - 1 : lev + 1;
		if (
			idx > -1 &&
			bindData[idx].key !== "photoInfo" &&
			String(bindData[idx].value) !== String(loadedData[bindData[idx].key])
		) {
			saveProfile();
		}
	}, [lev]);

	const next = () => {
		dispatch(addLev());
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

	const registerProfile = () => {
		const param = {
			address: address,
			age: age,
			gender: gender,
			job: job,
			height: height,
			hobby: hobby,
			idealType: idealType,
			mbti: mbti,
			selfDescription: selfDescription,
			smoking: smoking === "1",
		};
		http
			.post("/v1/user/profile/new", param)
			.then((response) => {
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "success",
							message: "프로필 생성이 완료되었습니다.",
						},
					}),
				);
				// userInfoSet
				dispatch(setUserStatus(response.data.data.userStatus));
				// navigate
				navigate("/user/wait", { replace: true });
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
			});
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
			init={photoUploadInit}
			changeInit={() => {
				setPhotoUploadInit(false);
			}}
			buttonInfo={{ type: NEXT }}
		/>,
		<SmokingSelect
			key={"smoking-select"}
			next={next}
			select={selectSmokingYn}
			buttonInfo={{
				label: "프로필 만들기",
				handler: registerProfile,
				type: GENERAL,
			}}
			data={smoking}
		/>,
	];

	return (
		<>
			<TransitionGroup
				className={"transition-wrapper"}
				childFactory={(child) => {
					return cloneElement(child, {
						classNames: isNext ? "right-to-left" : "left-to-right",
						timeout: 1000,
					});
				}}>
				<CSSTransition
					key={Pages[lev].key}
					classNames={"right-to-left"}
					timeout={1000}>
					{Pages[lev]}
				</CSSTransition>
			</TransitionGroup>
		</>
	);
}

export default MakeProfile;
