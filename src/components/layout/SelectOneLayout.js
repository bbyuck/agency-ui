import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useEffect, useState } from "react";
import { Button, Fab, Zoom } from "@mui/material";
import NextButton from "components/user/makeprofile/NextButton";
import { NEXT } from "constants/buttonType";

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
					style={{ position: "relative", marginTop: "20%", fontSize: "20px" }}>
					{list.map((button, index) => {
						return (
							<div
								className='join-button'
								onClick={() => {
									select(list[index].value);
									setSelected(index);
								}}
								key={`join-button-${index}`}
								style={{
									position: "relative",
									marginTop: "30px",
									fontWeight: "700",
								}}>
								<span>{button.label}</span>
								<span style={{ position: "absolute", right: "5%" }}>
									{selected === index ? (
										<CheckCircleOutlineOutlinedIcon fontSize='small' />
									) : (
										<CircleOutlinedIcon fontSize='small' />
									)}
								</span>
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
		</>
	);
}

export default SelectOneLayout;
