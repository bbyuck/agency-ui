import ProfileCard from "components/common/ProfileCard";
import { useEffect, useState } from "react";
import "style/common/ProfileCard.css";

const testData = {
	id: "encryptedId1",
	age: "94년생",
	address: "서울 화곡동",
	job: "개발자",
	height: 178,
	mbti: "ISFP",
	smoking: false,
	allowPhotoExchange: true,
	badges: ["ISFP", "비흡연자"],
	idealType: "165미만의 귀염상",
	hobby: "여행",
	selfDescription:
		"처음엔 무뚝뚝하지만 나중에는 장난도 잘 치고 활발해요. 흡연하구요 주량은 소주 한 병 반입니다!",
};

function ProfileDetail(props) {
	const [profile, setProfile] = useState(null);
	const { selectedProfileId } = props;

	useEffect(() => {
		/**
		 * 선택된 프로필 id로 조회 api 호출
		 */

		setProfile(testData);
		document.querySelector(".App").scrollTo(0, 0);
	}, []);

	return (
		<div className='page' id={"profile-detail"}>
			{profile ? <ProfileCard profile={profile} /> : null}
		</div>
	);
}

export default ProfileDetail;
