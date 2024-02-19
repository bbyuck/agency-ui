import { IconButton } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useEffect, useState } from "react";

function HomeHeader(props) {
	const { center, leftButton, process, rightButton } = props;
	const [received, setReceived] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setReceived(true);
		}, 3000);
	});

	return (
		<div className='container-header'>
			<div className='header'>
				<span className='header-left'>
					{process > 0 ? (
						<IconButton onClick={leftButton}>
							<ArrowBackIosOutlinedIcon aria-label='back button' size='large' />
						</IconButton>
					) : null}
				</span>
				<span
					className='header-center'
					style={{ position: "relative", fontWeight: 800, fontSize: "25px" }}>
					{center}
				</span>
				<span className='header-right'></span>
			</div>
		</div>
	);
}

export default HomeHeader;
