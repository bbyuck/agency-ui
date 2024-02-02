import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "style/login/Login.css";
import React, { useEffect } from "react";
import http from "api";
import { setAlert } from "store/slice/status";
import { isMobile } from "util";
import { forceHome } from "util";

function Login() {
	const theme = useTheme();
	const dispatch = useDispatch();

	const pcKakaoLogin = () => {
		http
			.get("/v1/kakao/key/rest")
			.then((response) => {
				const redirectUri = `${process.env.REACT_APP_CLIENT}/login/auth`;
				const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${response.data.data}&redirect_uri=${redirectUri}&response_type=code`;
				window.location.href = kakaoURL;
			})
			.catch((error) => {
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response
								? error.response.data.message
								: "서버에 연결할 수 없습니다.\n잠시 후 다시 시도해주세요.",
						},
					}),
				);
			});
	};

	const mobileKakaoLogin = () => {
		window.Kakao.Auth.authorize();
	};

	const appNameOrLogo = "연애조작단";

	return (
		<>
			<div className='page-container'>
				<div className='login login-form'>
					<div className='login-header'>
						<div className='login-header-contents'>
							<h2>{appNameOrLogo}</h2>
						</div>
					</div>

					<div className='button-kakao-login' onClick={pcKakaoLogin}>
						<span>
							<img
								src={`${process.env.PUBLIC_URL}/assets/icons/kakao_login_medium_wide.png`}
								alt={"카카오 로그인"}
							/>
						</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
