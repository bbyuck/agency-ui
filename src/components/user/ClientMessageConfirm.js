import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Fragment, forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

function ClientMessageConfirm(props) {
	const {
		dialogOpen,
		cancelButtonHandler,
		cancelButtonLabel,
		confirmButtonHandler,
		confirmButtonLabel,
		title,
		subtitle,
		body,
	} = props;

	return (
		<Fragment>
			<Dialog
				open={dialogOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => {
					console.log("close");
				}}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText
						id='alert-dialog-slide-description'
						sx={{ fontSize: "18px" }}>
						{subtitle}
					</DialogContentText>
					<br />
					<DialogContentText sx={{ fontSize: "12px", color: "gray" }}>
						{body}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button sx={{ color: "grey" }} onClick={cancelButtonHandler}>
						{cancelButtonLabel}
					</Button>
					<Button onClick={confirmButtonHandler}>{confirmButtonLabel}</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

export default ClientMessageConfirm;
