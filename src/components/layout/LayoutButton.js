import { Button } from "@mui/material";
import NextButton from "components/layout/NextButton";
import { GENERAL, NEXT } from "constants/buttonType";

function LayoutButton(props) {
	const { buttonInfo, data, next } = props;

	return (
		<>
			{buttonInfo.type === NEXT ? (
				<div className={"layout-next-button"}>
					<NextButton in={data !== null} next={next} />
				</div>
			) : buttonInfo.type === GENERAL ? (
				<div className={"layout-default-button"}>
					<Button
						onClick={buttonInfo.handler}
						variant='contained'
						disabled={!data}
						size='medium'
						style={{ width: "90vw", bottom: "3vh" }}>
						{buttonInfo.label}
					</Button>
				</div>
			) : null}
		</>
	);
}

export default LayoutButton;
