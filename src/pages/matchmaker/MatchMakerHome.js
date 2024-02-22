import http from "api";
import HomeHeader from "components/common/header/HomeHeader";
import MatchMakerHomeButtonList from "components/matchmaker/MatchMakerHomeButtonList";

function MatchMakerHome() {
	return (
		<>
			<HomeHeader />
			{/* <PromptText
				title={"초대 링크 공유"}
				subtitle={"소개 받으시는 분에게 초대링크를 보내주세요."}
			/> */}
			<MatchMakerHomeButtonList />

			{/* <MatchMakerLinkShare /> */}
		</>
	);
}

export default MatchMakerHome;
