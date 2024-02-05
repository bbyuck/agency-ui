import { Badge, Box, Grid, IconButton } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";

function HomeHeader(props) {
	const { leftButton, process, rightButton } = props;
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
				<span className='header-right'>
					{process === 0 ? (
						<IconButton
							aria-label='profile'
							color='primary'
							size='large'
							onClick={rightButton}>
							<Badge variant='dot' invisible={!received} color={"dot"}>
								<MailIcon />
							</Badge>
						</IconButton>
					) : null}
				</span>
			</div>
		</div>
	);
}

export default HomeHeader;
