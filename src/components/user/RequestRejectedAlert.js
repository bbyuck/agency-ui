import { useDispatch, useSelector } from "react-redux";
import http from "api";
import { setAlert, setRequestRejected } from "store/slice/status";
import messages from "messages";
import ClientMessageAlert from "./ClientMessageAlert";
import { REQUEST_REJECTED } from "constants/clientMessageCode";
import { setUserStatus } from "store/slice/memberInfo";

function RequestRejectedAlert() {
	const { requestRejected } = useSelector((state) => state.status);
	const dispatch = useDispatch();

	const confirm = () => {
		http
			.get("/v1/user/info/my")
			.then((response) => {
				console.log(response.data.data);
				dispatch(setUserStatus(response.data.data.userDto.userStatus));
				dispatch(setRequestRejected(false));
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
				dialogOpen={requestRejected}
				confirmButtonHandler={confirm}
				confirmButtonLabel={REQUEST_REJECTED.confirm}
				title={REQUEST_REJECTED.title}
				subtitle={REQUEST_REJECTED.subtitle}
				body={REQUEST_REJECTED.body}
			/>
		</>
	);
}

export default RequestRejectedAlert;
