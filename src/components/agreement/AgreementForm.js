import { Box, Button, Dialog, Grid, Slide } from "@mui/material";
import { Fragment, forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function AgreementForm(props) {
	const { open, handleClose, id, agree } = props;
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
