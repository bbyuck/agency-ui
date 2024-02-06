import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Fragment, forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "api";
import {
	confirmRequestReceived,
	setAlert,
	setRequestReceivedDialogOpen,
} from "store/slice/status";
import messages from "messages";
import { setMemberStatus } from "store/slice/memberInfo";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

function RequestReceivedAlert() {
	const { requestReceivedDialogOpen } = useSelector((state) => state.status);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
				dispatch(setRequestReceivedDialogOpen(false));
				dispatch(confirmRequestReceived());
				navigate("/user/matching/request/received", { replace: true });
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
				open={requestReceivedDialogOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => {
					console.log("close");
				}}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle>{"매칭 요청을 받았어요!"}</DialogTitle>
				<DialogContent>
					<DialogContentText
						id='alert-dialog-slide-description'
						sx={{ fontSize: "18px" }}>
						상대방의 프로필을 확인할까요?
					</DialogContentText>
					<br />
					<DialogContentText sx={{ fontSize: "12px", color: "gray" }}>
						만약, 거절하시면 요청보내신 분의 프로필은
						<br />
						앞으로 확인하실 수 없어요.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button sx={{ color: "grey" }} onClick={rejectRequest}>
						거절하기
					</Button>
					<Button onClick={confirmRequest}>확인하기</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

export default RequestReceivedAlert;
