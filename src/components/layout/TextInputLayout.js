import { Box, TextField } from "@mui/material";
import "style/common/Common.css";
import LayoutButton from "./LayoutButton";
import { getBytes } from "util";

function TextInputLayout(props) {
	const {
		next,
		buttonInfo,
		input,
		data,
		title,
		subtitle,
		label,
		limitByte,
		long = false,
	} = props;

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
						style={{
							position: "relative",
							top: "10vh",
							fontSize: "20px",
							width: "90vw",
						}}>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: { sm: "1fr" },
								gap: 2,
							}}>
							<TextField
								label={label}
								variant={long ? "outlined" : "standard"}
								multiline={long}
								rows={4}
								defaultValue={data}
								onChange={(e) => {
									if (limitByte && getBytes(e.target.value) > limitByte) {
										e.target.value = data;
										return;
									}

									input(e.target.value === "" ? null : e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										next();
									}
								}}
							/>
						</Box>
					</div>
				</div>
				<div className='layout-button-area'>
					<LayoutButton buttonInfo={buttonInfo} next={next} data={data} />
				</div>
			</div>
		</>
	);
}

export default TextInputLayout;
