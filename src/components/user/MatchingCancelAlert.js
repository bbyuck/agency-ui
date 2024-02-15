import { useDispatch, useSelector } from "react-redux";
import http from "api";
import { setMemberStatus } from "store/slice/memberInfo";
import { setAlert, setMatchingCancel } from "store/slice/status";
import messages from "messages";
import ClientMessageAlert from "./ClientMessageAlert";
import { MATCHING_CANCEL } from "constants/clientMessageCode";

function MatchingCancelAlert() {
	const { matchingCancel } = useSelector((state) => state.status);
	const dispatch = useDispatch();

	const confirm = () => {
		http
			.get("/v1/user/info/my")
			.then((response) => {
				console.log(response.data.data);
				dispatch(setMemberStatus(response.data.data.userDto.memberStatus));
				dispatch(setMatchingCancel(false));
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
	};

	return (
		<>
			<ClientMessageAlert
				dialogOpen={matchingCancel}
				confirmButtonHandler={confirm}
				confirmButtonLabel={MATCHING_CANCEL.confirm}
				title={MATCHING_CANCEL.title}
				subtitle={MATCHING_CANCEL.subtitle}
				body={MATCHING_CANCEL.body}
			/>
		</>
	);
}

export default MatchingCancelAlert;
