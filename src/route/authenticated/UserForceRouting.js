import {
	ACTIVE,
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

function UserForceRouting() {
	const { userStatus, matchMakerStatus } = useSelector(
		(state) => state.memberInfo,
	);
	const navigate = useNavigate();
	useEffect(() => {
		if (userStatus === PROFILE_MAKING) {
			navigate("/user/profile/make", { replace: true });
		} else if (userStatus === WAIT) {
			navigate("/user/wait", { replace: true });
		} else if (userStatus === MATCHING_WAIT) {
			navigate("/user/matching/wait", { replace: true });
		} else if (
			userStatus === REQUEST_RECEIVED ||
			userStatus === REQUEST_CONFIRMED
		) {
			navigate("/user/matching/request/received", { replace: true });
		} else if (userStatus === MATCHING || userStatus === MATCHING_CONFIRMED) {
			navigate("/user/matching", { replace: true });
		} else if (userStatus === MATCHING_ACCEPTED) {
			navigate("/user/matching/success", { replace: true });
		} else if (userStatus === NEW) {
			navigate("/user/new", { replace: true });
		} else if (userStatus === ACTIVE) {
			navigate("/user/home", { replace: true });
		}
	}, [userStatus, matchMakerStatus, navigate]);

	return <></>;
}

export default UserForceRouting;
