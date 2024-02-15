import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from "@mui/material";
import { Fragment, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "api";
import { setMemberStatus } from "store/slice/memberInfo";
import { setAlert, setRequestAccepted } from "store/slice/status";
import messages from "messages";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

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
		<Fragment>
			<Dialog
				open={requestAccepted}
				TransitionComponent={Transition}
				keepMounted
				onClose={confirm}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle>{"매칭이 되었어요!"}</DialogTitle>
				<DialogContent>
					<DialogContentText
						id='alert-dialog-slide-description'
						sx={{ fontSize: "18px" }}>
						상대방의 프로필을 확인하고 매칭을 완료해주세요.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={confirm}>확인</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

export default RequestAcceptedAlert;
