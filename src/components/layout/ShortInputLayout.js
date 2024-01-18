import { Box, Button, TextField } from "@mui/material";
import "style/common/Common.css";

function ShortInputLayout(props) {
	const { buttonInfo, input, data, title, subtitle } = props;

	return (
		<>
			<div className='layout-container'>
				<div className='layout-contents'>
					<div className='layout-title' style={{ fontSize: "30px" }}>
						{title}
					</div>
					<div
						className='layout-subtitle'
						style={{ height: "15px", fontSize: "15px" }}>
						{subtitle}
					</div>
					<div
						className='layout-input-area'
						style={{ position: "relative", top: "10vh", fontSize: "20px" }}>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: { sm: "1fr 1fr 1fr" },
								gap: 2,
								width: "90vw",
							}}>
							<TextField
								label='닉네임'
								variant='standard'
								onChange={(e) => {
									input(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										buttonInfo.handler();
									}
								}}
							/>
						</Box>
					</div>
				</div>
				<div className='layout-button-area'>
					<Button
						onClick={buttonInfo.handler}
						variant='contained'
						disabled={!data}
						size='medium'
						style={{ width: "90vw", position: "absolute" }}>
						{buttonInfo.name}
					</Button>
				</div>
			</div>
		</>
	);
}

export default ShortInputLayout;
