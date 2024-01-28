import {
	AppBar,
	Box,
	Button,
	Dialog,
	Grid,
	IconButton,
	Paper,
	Slide,
	Toolbar,
	Typography,
} from "@mui/material";
import { Fragment, forwardRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const Item = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

function AgreementForm(props) {
	const { open, handleClose, id, agree, disagree } = props;
	return (
		<Fragment>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				{id}
				<Box sx={{ width: "100%" }}>
					<Grid
						container
						justifyContent='center'
						rowSpacing={1}
						columnSpacing={{ xs: 4, sm: 4, md: 4 }}>
						<Grid item xs={5}>
							<Button
								onClick={() => {
									handleClose();
								}}
								variant={"outlined"}
								sx={{ width: "100%", borderRadius: "1em" }}
								color={"error"}>
								닫기
							</Button>
						</Grid>
						<Grid item xs={5}>
							<Button
								onClick={() => {
									agree();
									handleClose();
								}}
								variant={"outlined"}
								sx={{ width: "100%", borderRadius: "1em" }}>
								동의
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Dialog>
		</Fragment>
	);
}

export default AgreementForm;
