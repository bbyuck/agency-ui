import {
	MATCHING,
	MATCHING_ACCEPTED,
	MATCHING_CONFIRMED,
	MATCHING_WAIT,
	NEW,
	PROFILE_MAKING,
	REQUEST_CONFIRMED,
	REQUEST_RECEIVED,
	TEMP,
	WAIT,
} from "constants/memberStatus";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MatchMakerForceRouting() {
	const { userStatus, matchMakerStatus } = useSelector(
		(state) => state.memberInfo,
	);
	const navigate = useNavigate();
	useEffect(() => {
		if (matchMakerStatus === WAIT) {
			navigate("/matchmaker/wait", { replace: true });
		}
	}, [userStatus, matchMakerStatus, navigate]);

	return <></>;
}

export default MatchMakerForceRouting;
