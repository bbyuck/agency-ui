import { Button } from "@mui/material";
import NextButton from "components/layout/NextButton";
import { GENERAL, NEXT } from "constants/buttonType";

function LayoutButton(props) {
	const { buttonInfo, data, next, selected } = props;

	return (
		<>
			{buttonInfo.type === NEXT ? (
				<NextButton in={data !== null} next={next} />
			) : buttonInfo.type === GENERAL ? (
				<Button
					onClick={next}
					variant='contained'
					disabled={!data}
					size='medium'
					style={{ width: "90vw", position: "absolute" }}>
					{buttonInfo.label}
				</Button>
			) : null}
		</>
	);
}

export default LayoutButton;
