import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Fragment, forwardRef, useState } from "react";
import { useSelector } from "react-redux";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function BeforeRequestSendAlert(props) {
	const { open, close, sendRequest, maxCount, currentCount } = props;
	const { requestSend } = useSelector((state) => state.status);

	return (
		<Fragment>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => {
					console.log("close");
				}}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle>{"요청을 보낼까요?"}</DialogTitle>
				<DialogContent>
					<DialogContentText
						id='alert-dialog-slide-description'
						sx={{ fontSize: "18px" }}>
						오늘 보낸 요청 횟수
						<br />
						{`< ${requestSend.currentCount} / ${requestSend.maxCount} >`}
					</DialogContentText>
					<br />
					<DialogContentText sx={{ fontSize: "12px", color: "gray" }}>
						매칭 요청 횟수는 매일 오전 12시에 리셋됩니다.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button sx={{ color: "red" }} onClick={close}>
						닫기
					</Button>
					<Button onClick={sendRequest}>보내기</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

export default BeforeRequestSendAlert;
