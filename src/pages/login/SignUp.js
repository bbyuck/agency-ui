import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import "style/login/Login.css";
import React, { useRef, useState } from "react";
import http from "api";
import { muiTextFieldFocus } from "util";
import { useNavigate } from "react-router-dom";
import { setAlert } from "store/slice/status";

function SignUp() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const auth = useSelector((state) => {
		return state.auth;
	});

	const el = {
		LOGIN_ID: useRef(null),
		PASSWORD: useRef(null),
		PASSWORD_CONFIRM: useRef(null),
	};

	const [loginId, setLoginId] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const buttonStyle = {
		borderRadius: 15,
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.main,
		width: "8em",
		height: "2.5em",
	};

	const signup = () => {
		http
			.post("/v1/signup", {
				loginId: loginId,
				password: password,
				passwordConfirm: passwordConfirm,
			})
			.then((response) => {
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "success",
							message: `${response.data.data.loginId}님 환영합니다!`,
						},
					}),
				);
				navigate("/");
			})
			.catch((error) => {
				console.log(error.response.data);
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response.data.message,
						},
					}),
				);
				return muiTextFieldFocus(el[error.response.data.code]);
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
								{"SIGN UP /"}
							</span>
							<Link
								href='#'
								color={theme.palette.text.disabled}
								underline='hover'
								onClick={() => {
									navigate("/login");
								}}>
								{"Login"}
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
								id='input-login-id'
								label='ID'
								type='search'
								variant='standard'
								color='primary'
								onChange={(e) => {
									setLoginId(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										signup();
									}
								}}
								ref={el.LOGIN_ID}
								fullWidth
							/>
						</div>
						<div className='text-container'>
							<TextField
								id='input-password'
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
										signup();
									}
								}}
								ref={el.PASSWORD}
								fullWidth
							/>
						</div>
						<div className='text-container'>
							<TextField
								id='input-password-confirm'
								label='Confirm'
								type='password'
								autoComplete='current-password'
								variant='standard'
								color='primary'
								onChange={(e) => {
									setPasswordConfirm(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										signup();
									}
								}}
								ref={el.PASSWORD_CONFIRM}
								fullWidth
							/>
						</div>
						<div className='text-container'>
							<TextField
								id='input-phone'
								label='Phone'
								type='tel'
								variant='standard'
								color='primary'
								onChange={(e) => {
									console.log(`phone 번호 변경 ====== ${e.target.value}`);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										signup();
									}
								}}
								ref={el.PASSWORD_CONFIRM}
								fullWidth
							/>
						</div>
						<div className='button-container'>
							<Button
								onClick={signup}
								style={buttonStyle}
								disabled={false}
								size='medium'
								variant='filledTonal'
								color='primary'>
								Sign Up
							</Button>
						</div>
					</Box>
				</div>
			</div>
		</>
	);
}

export default SignUp;
