import { useDispatch, useSelector } from "react-redux";
import http from "api";
import { setAlert, setRequestReceivedDialogOpen } from "store/slice/status";
import messages from "messages";
import { setMemberStatus } from "store/slice/memberInfo";
import ClientMessageConfirm from "./ClientMessageConfirm";
import { REQUEST_RECEIVED } from "constants/clientMessageCode";

function RequestReceivedConfirm() {
	const { requestReceivedDialogOpen } = useSelector((state) => state.status);
	const dispatch = useDispatch();

	const rejectRequest = () => {
		http
			.post("/v1/matching/request/reject")
			.then((response) => {
				dispatch(setMemberStatus(response.data.data.memberStatus));
				dispatch(setRequestReceivedDialogOpen(false));
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

	const confirmRequest = () => {
		http
			.post("/v1/matching/request/confirm")
			.then((response) => {
				dispatch(setMemberStatus(response.data.data.memberStatus));
				dispatch(setRequestReceivedDialogOpen(false));
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
			<ClientMessageConfirm
				dialogOpen={requestReceivedDialogOpen}
				cancelButtonHandler={rejectRequest}
				cancelButtonLabel={REQUEST_RECEIVED.cancel}
				confirmButtonHandler={confirmRequest}
				confirmButtonLabel={REQUEST_RECEIVED.confirm}
				title={REQUEST_RECEIVED.title}
				subtitle={REQUEST_RECEIVED.subtitle}
				body={REQUEST_RECEIVED.body}
			/>
		</>
	);
}

export default RequestReceivedConfirm;
