import "style/common/AppHeader.css";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { IconButton } from "@mui/material";

function LinearHeader({ prev, process }) {
	// const button = {
	// 	back: <HeaderBackButton />,
	// 	none: null,
	// };

	return (
		<div className='container-header'>
			<div className='header'>
				<span className='header-left'>
					{process > 0 ? (
						<IconButton onClick={prev} aria-label='back button' size='large'>
							<ArrowBackIosOutlinedIcon />
						</IconButton>
					) : null}
				</span>
			</div>
		</div>
	);
}

export default LinearHeader;
