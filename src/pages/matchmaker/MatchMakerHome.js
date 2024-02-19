import { Button } from "@mui/material";
import http from "api";
import PromptText from "components/common/PromptText";
import MatchMakerLinkShare from "components/matchmaker/MatchMakerLinkShare";

function MatchMakerHome() {
	return (
		<>
			<PromptText
				title={"초대 링크 공유"}
				subtitle={"소개 받으시는 분에게 초대링크를 보내주세요."}
			/>
			<Button
				sx={{
					position: "absolute",
					left: "0",
					padding: 0,
					top: "25vh",
					width: "100vw",
				}}
				onClick={async () => {}}>
				링크 공유
			</Button>
			<MatchMakerLinkShare />
		</>
	);
}

export default MatchMakerHome;
