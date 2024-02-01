import http from "api";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "store/slice/status";

function MatchMakerHome() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const copyLink = () => {
		const params = { credentialToken: auth.credentialToken };
		http
			.get("/v1/matchmaker/link", { params })
			.then((response) => {
				window.navigator.clipboard.writeText(response.data.data).then(() => {
					dispatch(
						setAlert({
							alert: {
								open: true,
								type: "success",
								message: "클립보드에 복사 되었습니다.",
							},
						}),
					);
				});
			})
			.catch((error) => {
				console.log(error);
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.data.data.message,
						},
					}),
				);
			});
	};

	return (
		<>
			<div className='layout-copy-button-area'>
				소개받을 사람에게 전달할 링크 복사
				<button onClick={copyLink}>복사</button>
			</div>
		</>
	);
}

export default MatchMakerHome;
