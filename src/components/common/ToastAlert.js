import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Slide, Snackbar } from "@mui/material";
import { setAlert } from "store/slice/status";
import { useDispatch, useSelector } from "react-redux";

function ToastAlert() {
	const dispatch = useDispatch();
	const alertState = useSelector((state) => state.status.alert);
	const prevType = alertState.type;

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});

	const handleClose = (event, reason) => {
		dispatch(setAlert({ alert: { open: false, type: prevType, message: null } }));
	};

	return (
		<>
			<Snackbar
				TransitionComponent={Slide}
				key={Slide.name}
				open={alertState.open}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={3000}
				onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={alertState.type}
					sx={{ width: "100%" }}
					style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
					{alertState.message}
				</Alert>
			</Snackbar>
		</>
	);
}

export default ToastAlert;
