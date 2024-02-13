import { MATCH_MAKER, TEMP, USER } from "constants/memberCode";
import {
	MATCHING_WAIT,
	NEW,
	PROFILE_MAKING,
	REQUEST_CONFIRMED,
	REQUEST_RECEIVED,
	WAIT,
} from "constants/memberStatus";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ForceRouting() {
	const { memberCode, memberStatus } = useSelector((state) => state.memberInfo);
	const navigate = useNavigate();
	useEffect(() => {
		if (memberCode === USER) {
			if (memberStatus === PROFILE_MAKING) {
				navigate("/user/profile/make", { replace: true });
			} else if (memberStatus === WAIT) {
				navigate("/user/wait");
			} else if (memberStatus === MATCHING_WAIT) {
				navigate("/user/matching/wait");
			} else if (
				memberStatus === REQUEST_RECEIVED ||
				memberStatus === REQUEST_CONFIRMED
			) {
				navigate("/user/matching/request/received");
			} else {
				navigate("/user/home", { replace: true });
			}
		}

		if (memberCode === MATCH_MAKER) {
			if (memberStatus === WAIT) {
				navigate("/matchmaker/wait");
			} else {
				navigate("/matchmaker/home", { replace: true });
			}
		}

		if (memberCode === TEMP) {
			if (memberStatus === TEMP) {
				navigate("/agreement", { replace: true });
			} else if (memberStatus === NEW) {
				navigate("/join", { replace: true });
			} else {
				navigate("/error", { replace: true });
			}
		}
	}, [memberCode, memberStatus, navigate]);

	return <></>;
}

export default ForceRouting;
