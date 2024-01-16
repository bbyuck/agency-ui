import { useState } from "react";
import GenderSelect from "./GenderSelect";
import PhotoExchangeSelect from "./PhotoExchangeSelect";
import SmokingSelect from "./SmokingSelect";
import MakeProfileHeader from "components/user/makeprofile/MakeProfileHeader";

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
			next={next}
			select={selectGender}
			data={newProfileData.gender}
		/>,
		<PhotoExchangeSelect
			next={next}
			select={selectPhotoExchangeYn}
			data={newProfileData.allowPhotoExchange}
		/>,
		<SmokingSelect
			next={next}
			select={selectSmokingYn}
			data={newProfileData.smoking}
		/>,
	];

	return (
		<>
			<MakeProfileHeader prev={prev} process={process} />
			{Pages[process]}
		</>
	);
}

export default MakeProfile;
