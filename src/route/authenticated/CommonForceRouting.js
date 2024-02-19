import { TEMP } from "constants/memberStatus";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CommonForceRouting() {
	const { userStatus, matchMakerStatus } = useSelector(
		(state) => state.memberInfo,
	);
	const navigate = useNavigate();
	useEffect(() => {
		if (userStatus === TEMP && matchMakerStatus === TEMP) {
			navigate("/agreement", { replace: true });
		}
	}, [userStatus, matchMakerStatus, navigate]);

	return <></>;
}

export default CommonForceRouting;
