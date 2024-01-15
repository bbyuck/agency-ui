import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetMemberType, selectMemberType } from "store/slice/joinInfo";
import { MATCH_MAKER, NEW, USER } from "constants/memberType";
import { useNavigate } from "react-router-dom";

function SelectMatchType() {
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (auth.memberType !== NEW) {
			navigate("/");
		}
	});

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
		navigate("/join/matchmakername", {
			replace: true,
			state: { animation: "next" },
		});
	};

	return (
		<div className='page'>
			<div style={{ position: "relative", textAlign: "left", marginLeft: "5%" }}>
				<div
					style={{
						position: "relative",
						marginTop: "20%",
						fontWeight: 900,
						fontSize: "30px",
					}}>
					만나서 반가워요!
				</div>
				<div style={{ position: "relative", fontSize: "15px", height: "15px" }}>
					어떻게 오셨어요?
				</div>
				<div
					className='container-input-area'
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
