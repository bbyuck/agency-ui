import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { Fragment } from "react";

function Confirm(props) {
	const { confirmOpen, closeConfirmDialog, title, contnents, confirm } = props;

	// const title =  "주선자를 알려주세요!"
	/* const contents = "주선자를 입력하지 않았습니다.
							<br />
							주선자가 없을 경우 매칭이 어려워질 수 있습니다.
							<br />
							<br />
							이대로 진행할까요?" */
	return (
		<>
			<Fragment>
				<Dialog
					open={confirmOpen}
					// onClose={closeConfirmDialog}
					aria-labelledby='responsive-dialog-title'
					fullWidth>
					<DialogTitle
						id='responsive-dialog-title'
						style={{ fontWeight: "700", width: "100%" }}>
						{title}
					</DialogTitle>
					<DialogContent>
						<DialogContentText style={{ fontSize: "15px" }}>
							{contnents}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button autoFocus onClick={closeConfirmDialog} style={{ color: "red" }}>
							취소
						</Button>
						<Button onClick={confirm} autoFocus>
							확인
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		</>
	);
}

export default Confirm;
