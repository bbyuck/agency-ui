import { useDispatch, useSelector } from "react-redux";
import http from "api";
import { setMemberStatus } from "store/slice/memberInfo";
import { setAlert, setMatchingSuccess } from "store/slice/status";
import messages from "messages";
import ClientMessageAlert from "./ClientMessageAlert";
import { MATCHING_SUCCESS } from "constants/clientMessageCode";

function MatchingSuccessAlert() {
	const { matchingSuccess } = useSelector((state) => state.status);
	const dispatch = useDispatch();

	const confirm = () => {
		http
			.get("/v1/user/info/my")
			.then((response) => {
				console.log(response.data.data);
				dispatch(setMemberStatus(response.data.data.userDto.memberStatus));
				dispatch(setMatchingSuccess(false));
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
				dialogOpen={matchingSuccess}
				confirmButtonHandler={confirm}
				confirmButtonLabel={MATCHING_SUCCESS.confirm}
				title={MATCHING_SUCCESS.title}
				subtitle={MATCHING_SUCCESS.subtitle}
				body={MATCHING_SUCCESS.body}
			/>
		</>
	);
}

export default MatchingSuccessAlert;
