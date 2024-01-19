import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	useMediaQuery,
} from "@mui/material";
import LayoutButton from "./LayoutButton";

function MBTIButtonLayout(props) {
	const { title, subtitle, list, next, select, data, buttonInfo } = props;

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
						className='layout-mbti-select-area'
						style={{
							position: "relative",
							top: "5vh",
							fontSize: "20px",
						}}>
						<Box>
							<ToggleButtonGroup
								className='layout-mbti-button-group'
								color='primary'
								value={data}
								exclusive
								onChange={(e) => {
									select(e.target.value);
								}}
								aria-label='Platform'
								sx={{
									display: "grid",
									gridTemplateColumns: { sm: "1fr 1fr 1fr 1fr", xs: "1fr 1fr 1fr 1fr" },
									gap: 3,
									placeItems: "center",
								}}>
								{list.map((elem, index) => (
									<ToggleButton
										key={`mbti-toggle-${elem}`}
										sx={{
											width: "15vw",
											border: "none",
										}}
										value={elem}>
										{elem}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
						</Box>
					</div>
				</div>
				<div className='layout-button-area'>
					<LayoutButton buttonInfo={buttonInfo} data={data} next={next} />
				</div>
			</div>
		</>
	);
}

export default MBTIButtonLayout;
