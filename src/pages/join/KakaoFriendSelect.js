import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlert, setCallbackPage } from "store/slice/status";

function KakaoFriendSelect(props) {
	const { back } = props;

	const dispatch = useDispatch();

	const openKakaoFriendSelectPage = async () => {
		await window.Kakao.Auth.setAccessToken(sessionStorage.getItem("accessToken"));

		window.Kakao.Picker.selectFriend({
			title: "카카오톡에서 주선자 선택",
			// returnUrl: `${process.env.REACT_APP_CLIENT}/join`,
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				if (error.code === -402) {
					dispatch(setCallbackPage({ callbackPage: "KAKAO-FRIEND-SELECT" }));

					window.Kakao.Auth.authorize({
						redirectUri: `${process.env.REACT_APP_CLIENT}/auth`,
						scope: "friends",
					});
				}

				if (error.code === -5) {
					dispatch(
						setAlert({
							alert: {
								open: true,
								type: "error",
								message: "카카오톡 친구 목록 중 서비스에 가입된 주선자가 없습니다.",
							},
						}),
					);
					back();
				}

				console.log(error);
			});
	};

	useEffect(() => {
		openKakaoFriendSelectPage();
	}, []);

	return <></>;
}

export default KakaoFriendSelect;
