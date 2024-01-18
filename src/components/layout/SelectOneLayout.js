import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useEffect, useState } from "react";
import { Button, Fab, Radio, Zoom } from "@mui/material";
import NextButton from "components/user/makeprofile/NextButton";
import { NEXT } from "constants/buttonType";
import "style/common/Common.css";

function SelectOneLayout(props) {
	const { title, subtitle, list, next, select, data, buttonType } = props;

	const [selected, setSelected] = useState(null);

	useEffect(() => {
		list.forEach((elem, index) => {
			if (elem.value === data) {
				setSelected(index);
			}
		});
	}, []);

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
						className='layout-select-area'
						style={{ position: "relative", top: "5vh", fontSize: "20px" }}>
						{list.map((button, index) => {
							return (
								<div
									className='layout-select-button'
									onClick={() => {
										select(list[index].value);
										setSelected(index);
									}}
									key={`layout-select-button-${index}`}
									style={{
										position: "relative",
										marginTop: "5vh",
										fontWeight: "700",
										height: "55px",
									}}>
									<div
										className='layout-select-label'
										style={{
											position: "absolute",
										}}>
										{button.label}
									</div>
									<div
										className='layout-select-radio'
										style={{
											position: "absolute",
											right: "5vw",
										}}>
										<Radio checked={selected === index} />
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className='button-area'>
					{/* <Button
					onClick={next}
					variant='contained'
					size='medium'
					disabled={selected === null}
					style={{ width: "80%" }}>
					확인
				</Button> */}
					{buttonType === NEXT ? (
						<NextButton in={selected !== null} next={next} />
					) : null}
				</div>
			</div>
		</>
	);
}

export default SelectOneLayout;
