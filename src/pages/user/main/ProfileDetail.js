import ProfileCard from "components/common/ProfileCard";
import { useEffect, useState } from "react";
import "style/common/ProfileCard.css";
import http from "api";

function ProfileDetail(props) {
	const [profile, setProfile] = useState(null);
	const { selectedProfileId } = props;

	document.querySelector(".App").scrollTo(0, 0);

	useEffect(() => {
		/**
		 * 선택된 프로필 id로 조회 api 호출
		 */
		http
			.get(`/v1/profile/detail/${selectedProfileId}`)
			.then((response) => {
				setProfile(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});

		// setProfile(testData);
		// window.scrollTo(0, 0);

		return () => {
			document.querySelector(".App").scrollTo(0, 0);
		};
	}, [selectedProfileId]);

	return (
		<div className='page' id={"profile-detail"}>
			{profile ? <ProfileCard profile={profile} /> : null}
		</div>
	);
}

export default ProfileDetail;
