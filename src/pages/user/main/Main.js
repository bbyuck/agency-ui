import ProfileListCard from "components/common/ProfileListCard";
import { useEffect } from "react";
import "style/common/Main.css";

function Main(props) {
	const { reset, select } = props;
	const profiles = [
		{
			id: "encryptedId1",
			age: "94",
			address: "서울 화곡동",
			job: "개발자",
			height: 178,
			mbti: "ISFP",
			smoking: false,
			allowPhotoExchange: true,
		},
		{
			id: "encryptedId2",
			age: "94",
			address: "동탄",
			job: "삼성전자",
			height: 182,
			mbti: "ENTP",
			smoking: true,
			allowPhotoExchange: false,
		},
		{
			id: "encryptedId3",
			age: "빠른 92",
			address: "인천",
			job: "LG 마그나 연구원",
			height: 178,
			mbti: "ISTP",
			smoking: true,
			allowPhotoExchange: true,
		},
		{
			id: "encryptedId4",
			age: "94",
			address: "인천",
			job: "LG 마그나 연구원",
			height: 178,
			mbti: "ISTP",
			smoking: true,
			allowPhotoExchange: true,
		},
	];

	useEffect(() => {
		reset();
	}, []);

	return (
		<div className={"page"}>
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
	);
}

export default Main;
