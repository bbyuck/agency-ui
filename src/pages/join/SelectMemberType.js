import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectMemberType } from "store/slice/joinInfo";
import { MATCH_MAKER, USER } from "constants/memberType";

function SelectMatchType() {
	const dispatch = useDispatch();

	const buttons = [
		{
			label: "소개해 주러 왔어요",
			value: MATCH_MAKER,
		},
		{
			label: "소개받으러 왔어요",
			value: USER,
		},
	];

	const [selected, setSelected] = useState(null);

	const buttonHandler = () => {
		dispatch(selectMemberType({ memberType: buttons[selected].value }));
	};

	return (
		<div>
			<div style={{ position: "relative", textAlign: "left", marginLeft: "5%" }}>
				<div
					style={{
						position: "relative",
						marginTop: "20%",
						fontWeight: 900,
						fontSize: "30px",
					}}>
					Nice ddu meet you!
				</div>
				<div style={{ position: "relative", fontSize: "15px", height: "15px" }}>
					어떻게 오셨어요?
				</div>
				<div
					className='container-join-button'
					style={{ position: "relative", marginTop: "20%", fontSize: "20px" }}>
					{buttons.map((button, index) => {
						return (
							<div
								className='join-button'
								onClick={() => {
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
			<div
				className='button-area'
				style={{ position: "fixed", bottom: "7.5%", width: "100%" }}>
				<Button
					onClick={buttonHandler}
					variant='contained'
					size='medium'
					disabled={selected === null}
					style={{ width: "80%" }}>
					확인
				</Button>
			</div>
		</div>
	);
}

export default SelectMatchType;
