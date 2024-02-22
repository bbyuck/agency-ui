import ProfileListCard from "components/common/ProfileListCard";
import { useEffect, useState } from "react";
import http from "api";
import PromptText from "components/common/PromptText";

function MatchMakerUserList() {
	const [profiles, setProfiles] = useState([]);

	useEffect(() => {
		http
			.get("/v1/matchmaker/user")
			.then((response) => {
				setProfiles(response.data.data);
			})
			.catch((error) => {});
	}, []);

	const select = () => {
		alert("프로필 선택");
	};

	return (
		<div className='page'>
			{profiles.length > 0 ? (
				<div
					style={{
						position: "relative",
						top: "6vh",
					}}>
					<div className={"container-main-profile-card-list"}>
						{profiles.map((profile, index) => (
							<ProfileListCard
								select={select}
								profile={profile}
								key={`profile-card-${index}`}
							/>
						))}
					</div>
				</div>
			) : (
				<PromptText
					title='연결된 유저가 없습니다.'
					subtitle='소개 시켜주실 분에게 접속 링크를 공유해주세요.'
				/>
			)}
		</div>
	);
}

export default MatchMakerUserList;
