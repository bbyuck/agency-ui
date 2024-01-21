import { IconButton } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

function HomeHeader(props) {
	const { prev, process } = props;

	return (
		<div className='container-header'>
			<div className='header'>
				<span className='header-left'>
					{process > 0 ? (
						<IconButton onClick={prev}>
							<ArrowBackIosOutlinedIcon aria-label='back button' size='large' />
						</IconButton>
					) : null}
				</span>
				<span className='header-right'>
					<IconButton aria-label='profile' size='large'>
						<PersonOutlineOutlinedIcon />
					</IconButton>
				</span>
			</div>
		</div>
	);
}

export default HomeHeader;
