import { Fab, Zoom } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

function NextButton(props) {
	return (
		<>
			<span onClick={props.next}>
				<Zoom key={"primary"} in={props.in} timeout={300} unmountOnExit>
					<Fab
						sx={{
							position: "absolute",
							bottom: "5vh",
							right: "5vw",
						}}
						aria-label={"next"}
						color={"primary"}>
						{<ArrowForwardIosOutlinedIcon />}
					</Fab>
				</Zoom>
			</span>
		</>
	);
}

export default NextButton;
