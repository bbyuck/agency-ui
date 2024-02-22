import { Button } from "@mui/material";
import PromptText from "components/common/PromptText";
import http from "api";
import messages from "messages";
import { setAlert } from "store/slice/status";
import { useDispatch } from "react-redux";
import { setMatchMakerStatus } from "store/slice/memberInfo";

function MatchMakerNew(props) {
	const { approver } = props;
	const title = `소개시켜주실 분이 있나요?`;
	const subtitle = `주선자는 첫 등록시 ${approver}의 승인이 필요해요.`;
	const dispatch = useDispatch();

	return (
		<>
			<PromptText title={title} subtitle={subtitle} />
			<Button
				sx={{
					position: "absolute",
					left: "0",
					padding: 0,
					bottom: "15vh",
					width: "100vw",
				}}
				onClick={async () => {
					http
						.post("/v1/matchmaker")
						.then((response) => {
							dispatch(setMatchMakerStatus(response.data.data.matchMakerStatus));
						})
						.catch((error) => {
							dispatch(
								setAlert({
									alert: {
										open: true,
										type: "error",
										message: error.response
											? error.response.data.message
											: messages.error.connect_to_server,
									},
								}),
							);
						});
				}}>
				승인 요청
			</Button>
		</>
	);
}

export default MatchMakerNew;
