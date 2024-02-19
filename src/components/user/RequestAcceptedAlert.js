import { useDispatch, useSelector } from "react-redux";
import http from "api";
import { setAlert, setRequestAccepted } from "store/slice/status";
import messages from "messages";
import ClientMessageAlert from "./ClientMessageAlert";
import { REQUEST_ACCEPTED } from "constants/clientMessageCode";
import { setUserStatus } from "store/slice/memberInfo";

function RequestAcceptedAlert() {
	const { requestAccepted } = useSelector((state) => state.status);
	const dispatch = useDispatch();

	const confirm = () => {
		http
			.get("/v1/user/info/my")
			.then((response) => {
				console.log(response.data.data);
				dispatch(setUserStatus(response.data.data.userDto.userStatus));
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
