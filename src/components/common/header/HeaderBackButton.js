import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";

function HeaderBackButton(props) {
	const goBack = props.goBack
		? props.goBack
		: () => {
				navigate(-1, { replace: true, state: { animation: "prev" } });
		  };

	const navigate = useNavigate();

	return (
		<span onClick={goBack}>
			<ArrowBackIosOutlinedIcon />
		</span>
	);
}

export default HeaderBackButton;
