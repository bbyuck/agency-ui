import http from "api";
import messages from "messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlert } from "store/slice/status";

function BeAFriend() {
	const { userStatus } = useSelector((state) => state.userInfo);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const matchMakerCode = sessionStorage.getItem("mc");
		if (!matchMakerCode) {
			navigate("/user/home");
		}

		http
			.post("/v1/friendship", { matchMakerCode: matchMakerCode })
			.then((response) => {
				const success = response.data.data;
				if (success) {
					dispatch(
						setAlert({
							alert: {
								open: true,
								type: "success",
								message: "주선자가 추가되었습니다.",
							},
						}),
					);
				}
			})
			.catch((error) => {
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response
								? error.response.data.message
								: messages.error.connect_to_server,
						},
					}),
				);
			})
			.finally(() => {
				navigate("/user/home", { replace: true });
			});

		return () => {
			sessionStorage.removeItem("mc");
		};
	}, [navigate, userStatus]);

	return <></>;
}

export default BeAFriend;
