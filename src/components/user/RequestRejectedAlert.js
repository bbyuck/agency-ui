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
	setAlert,
	setRequestReceivedDialogOpen,
	setRequestRejected,
} from "store/slice/status";
import messages from "messages";
import { setMemberStatus } from "store/slice/memberInfo";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

function RequestRejectedAlert() {
	const { requestRejected } = useSelector((state) => state.status);
	const dispatch = useDispatch();

	const confirm = () => {
		http
			.get("/v1/user/info/my")
			.then((response) => {
				console.log(response.data.data);
				dispatch(setMemberStatus(response.data.data.userDto.memberStatus));
				dispatch(setRequestRejected(false));
			})
			.catch((error) => {
				setAlert({
					alert: {
						open: true,
						type: "success",
						message: "가입이 완료되었습니다.",
					},
				});
			});
	};

	return (
		<Fragment>
			<Dialog
				open={requestRejected}
				TransitionComponent={Transition}
				keepMounted
				onClose={confirm}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle>{"매칭이 성사되지 않았어요."}</DialogTitle>
				<DialogContent>
					<DialogContentText
						id='alert-dialog-slide-description'
						sx={{ fontSize: "18px" }}>
						상대방의 거절로 매칭이 성사되지 않았습니다.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={confirm}>확인</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

export default RequestRejectedAlert;
