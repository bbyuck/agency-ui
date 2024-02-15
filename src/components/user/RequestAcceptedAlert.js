import { useDispatch, useSelector } from "react-redux";
import http from "api";
import { setMemberStatus } from "store/slice/memberInfo";
import { setAlert, setRequestAccepted } from "store/slice/status";
import messages from "messages";
import ClientMessageAlert from "./ClientMessageAlert";
import { REQUEST_ACCEPTED } from "constants/clientMessageCode";

function RequestAcceptedAlert() {
	const { requestAccepted } = useSelector((state) => state.status);
	const dispatch = useDispatch();

	const confirm = () => {
		http
			.get("/v1/user/info/my")
			.then((response) => {
				console.log(response.data.data);
				dispatch(setMemberStatus(response.data.data.userDto.memberStatus));
				dispatch(setRequestAccepted(false));
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
				dialogOpen={requestAccepted}
				confirmButtonHandler={confirm}
				confirmButtonLabel={REQUEST_ACCEPTED.confirm}
				title={REQUEST_ACCEPTED.title}
				subtitle={REQUEST_ACCEPTED.subtitle}
				body={REQUEST_ACCEPTED.body}
			/>
		</>
	);
}

export default RequestAcceptedAlert;
