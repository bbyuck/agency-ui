import { IconButton } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useDispatch, useSelector } from "react-redux";
import { subLev } from "store/slice/page";

function HomeHeader(props) {
	const { center, rightButton } = props;
	const dispatch = useDispatch();
	const { lev } = useSelector((state) => state.page);

	return (
		<div className='container-header'>
			<div className='header'>
				<span className='header-left'>
					{lev > 0 ? (
						<IconButton
							onClick={() => {
								dispatch(subLev());
							}}>
							<ArrowBackIosOutlinedIcon aria-label='back button' size='large' />
						</IconButton>
					) : null}
				</span>
				<span
					className='header-center'
					style={{ position: "relative", fontWeight: 800, fontSize: "25px" }}>
					{center}
				</span>
				<span className='header-right'>{rightButton}</span>
			</div>
		</div>
	);
}

export default HomeHeader;
