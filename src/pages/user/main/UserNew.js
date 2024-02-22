import { Button } from "@mui/material";
import PromptText from "components/common/PromptText";
import http from "api";
import { useDispatch } from "react-redux";
import { setUserStatus } from "store/slice/memberInfo";
import { setAlert } from "store/slice/status";
import messages from "messages";

function UserNew() {
	const dispatch = useDispatch();
	return (
		<>
			<PromptText
				title={"만나서 반가워요!"}
				subtitle={"소개를 받기 위해서는 프로필을 작성해야 합니다."}
			/>
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
						.post("/v1/user")
						.then((response) => {
							dispatch(setUserStatus(response.data.data.userStatus));
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
				프로필 작성
			</Button>
		</>
	);
}

export default UserNew;
