import "style/common/AppHeader.css";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

function LinearHeader({ prev, process }) {
	// const button = {
	// 	back: <HeaderBackButton />,
	// 	none: null,
	// };

	return (
		<div className='container-header'>
			<div className='header'>
				<span className='header-left'>
					{process > 1 ? (
						<span onClick={prev}>
							<ArrowBackIosOutlinedIcon />
						</span>
					) : null}
				</span>
			</div>
		</div>
	);
}

export default LinearHeader;
