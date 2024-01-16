import { Box, Button, TextField } from "@mui/material";

function ShortInputLayout(props) {
	const { confirm, input, data, title, subtitle } = props;

	return (
		<>
			<div>
				<div style={{ position: "relative", textAlign: "left", marginLeft: "5%" }}>
					<div
						style={{
							position: "relative",
							marginTop: "20%",
							fontWeight: 900,
							fontSize: "30px",
						}}>
						{title}
					</div>
					<div style={{ position: "relative", fontSize: "15px", height: "15px" }}>
						{subtitle}
					</div>
					<div
						className='container-input-area'
						style={{
							position: "relative",
							marginTop: "20%",
							fontSize: "20px",
							width: "95%",
						}}>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: { sm: "1fr 1fr 1fr" },
								gap: 2,
							}}>
							<TextField
								label='닉네임'
								variant='standard'
								onChange={(e) => {
									input(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										confirm();
									}
								}}
							/>
						</Box>
					</div>
				</div>
				<div className='button-area'>
					{/* <Button
						onClick={confirm}
						variant='contained'
						disabled={true}
						size='medium'
						style={{ width: "80%" }}>
						확인
					</Button> */}
				</div>
			</div>
		</>
	);
}

export default ShortInputLayout;
