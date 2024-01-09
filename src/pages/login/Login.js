import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "store/slice/auth";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import "style/login/Login.css";
import React, { useRef, useState } from "react";
import http from "api";
import { useNavigate } from "react-router-dom";
import { muiTextFieldFocus } from "util";
import { setAlert } from "store/slice/status";
import { muiTextFieldClear } from "util";

function Login() {
	const navigate = useNavigate();
	const theme = useTheme();
	const dispatch = useDispatch();
	const auth = useSelector((state) => {
		return state.auth;
	});

	const [loginId, setLoginId] = useState("");
	const [password, setPassword] = useState("");

	const el = {
		LOGIN_ID: useRef(null),
		PASSWORD: useRef(null),
	};

	const buttonStyle = {
		borderRadius: 15,
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.main,
		width: "8em",
		height: "2.5em",
	};

	const login = () => {
		http
			.post("/v1/token/issue", { loginId: loginId, password: password })
			.then((response) => {
				/**
				 * application store에 유저 정보 저장
				 */
				dispatch(
					authenticate({
						accessToken: response.data.data.accessToken,
						refreshToken: response.data.data.refreshToken,
						loginId: response.data.data.loginId,
					}),
				);

				navigate("/main");
			})
			.catch((error) => {
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response.data.message,
						},
					}),
				);

				if (error.response.data.code === "USER_NOT_FOUND") {
					muiTextFieldClear(el.PASSWORD);
					return muiTextFieldFocus(el.LOGIN_ID);
				}

				return muiTextFieldFocus(el[error.response.data.code]);
				// alert(error.response.data.message);
			});
	};

	return (
		<>
			<div className='page-container'>
				<div className='login login-form'>
					<div className='login-header'>
						<div>{auth.userId ? auth.userId + " Logged in" : null}</div>
						<div className='login-header-contents'>
							<span className='selected' style={{ color: theme.palette.text.primary }}>
								LOGIN /
							</span>
							<Link
								href='#'
								color={theme.palette.text.disabled}
								underline='hover'
								onClick={() => {
									navigate("/signup");
								}}>
								{"Sign up"}
							</Link>
						</div>
					</div>
					<Box
						component='form'
						sx={{
							"& .MuiTextField-root": { m: 1, width: "300px", margin: 0 },
						}}
						noValidate
						autoComplete='off'>
						<div className='text-container'>
							<TextField
								id='standard-search'
								label='ID'
								type='search'
								variant='standard'
								color='primary'
								onChange={(e) => {
									setLoginId(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										login();
									}
								}}
								fullWidth
								ref={el.LOGIN_ID}
							/>
						</div>
						<div className='text-container'>
							<TextField
								id='standard-password-input'
								label='Password'
								type='password'
								autoComplete='current-password'
								variant='standard'
								color='primary'
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										login();
									}
								}}
								fullWidth
								ref={el.PASSWORD}
							/>
						</div>
						<div className='button-container'>
							<Button
								onClick={login}
								style={buttonStyle}
								disabled={false}
								size='medium'
								variant='filledTonal'
								color='primary'>
								Login
							</Button>
						</div>
					</Box>
				</div>
			</div>
		</>
	);
}

export default Login;
