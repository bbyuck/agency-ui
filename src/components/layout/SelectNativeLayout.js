import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";
import "style/common/Common.css";
import LayoutButton from "./LayoutButton";

function SelectNativeLayout(props) {
	const { next, buttonInfo, select, list, data, title, subtitle, label } = props;

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
							<FormControl fullWidth>
								<InputLabel variant='standard' htmlFor='uncontrolled-native'>
									{label}
								</InputLabel>
								<NativeSelect
									defaultValue={data}
									inputProps={{
										name: "age",
										id: "uncontrolled-native",
									}}
									onChange={(e) => {
										select(e.target.value === "none" ? null : e.target.value);
									}}>
									{list.map((elem, index) => (
										<option key={`select-option-${index}`} value={elem.value}>
											{elem.label}
										</option>
									))}
								</NativeSelect>
							</FormControl>
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

export default SelectNativeLayout;
