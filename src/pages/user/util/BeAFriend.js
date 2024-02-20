import http from "api";
import { ACTIVE } from "constants/memberStatus";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

function BeAFriend() {
	const { userStatus } = useSelector((state) => state.userStatus);
	const [searchParams] = useSearchParams();
	const matchmakerCode = searchParams.get("matchmaker");
	const navigate = useNavigate();

	useEffect(() => {
		if (!matchmakerCode) {
			navigate("/user/home");
		}
		if (userStatus !== ACTIVE) {
			navigate("/error");
		}

		alert(window.navigator.userAgent.toLowerCase());
	}, [matchmakerCode, navigate, userStatus]);

	return <></>;
}

export default BeAFriend;
