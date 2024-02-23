import styled from "@emotion/styled";
import { Box, Grid, Paper, ThemeProvider } from "@mui/material";
import { useState } from "react";
import theme from "style/theme";
import http from "api";
import { useDispatch } from "react-redux";
import { setAlert } from "store/slice/status";
import messages from "messages";
import { useNavigate } from "react-router-dom";
import { addLev } from "store/slice/page";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	color: theme.palette.text.secondary,
	height: 70,
	lineHeight: "70px",
	borderRadius: "10px",
	width: "100%",
}));

function MatchMakerHomeButtonList() {
	const [elevation, setElevation] = useState(6);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getLink = () => {
		return http.get("/v1/matchmaker/link");
	};
	const shareCodeThroughKakaoTalk = () => {
		getLink()
			.then((response) => {
				window.Kakao.Share.sendDefault({
					objectType: "text",
					text: "연애조작단에서 초대가 도착했어요!",
					link: {
						webUrl: response.data.data,
						mobileWebUrl: response.data.data,
					},
				});
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
			});
	};

	const findUserList = () => {
		dispatch(addLev());
		navigate("/matchmaker/user");
	};

	const findUserMatchingList = () => {
		dispatch(
			setAlert({
				alert: {
					open: true,
					type: "warning",
					message: "서비스 준비중입니다.",
				},
			}),
		);
	};

	const buttons = [
		{
			key: "share-matchmaker-code",
			label: "주선자 코드와 함께 링크 공유",
			icon: (
				<img
					style={{ height: "70%", position: "relative", right: 0 }}
					src={`${process.env.PUBLIC_URL}/assets/images/kakaotalk_sharing_btn_medium.png`}
					alt={"kakao"}
				/>
			),
			handler: shareCodeThroughKakaoTalk,
		},
		{
			key: "matchmaker-user-list",
			label: "소개 풀 유저 목록",
			handler: findUserList,
		},
		{
			key: "matchmaker-user-matching-list",
			label: "유저 매칭 목록",
			handler: findUserMatchingList,
		},
	];

	return (
		<div style={{ position: "relative", top: "10vh" }}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<ThemeProvider theme={theme}>
						<Box
							sx={{
								p: 2,
								borderRadius: 2,
								bgcolor: "background.default",
								display: "grid",
								gridTemplateColumns: { md: "1fr 1fr" },
								gap: 4,
							}}>
							{buttons.map((button) => (
								<Item key={button.key} elevation={elevation} onClick={button.handler}>
									<div
										style={{
											position: "relative",
											height: "100%",
											width: "100%",
										}}>
										<span style={{ position: "absolute", left: "3%" }}>
											{button.label}
										</span>
										<span
											style={{
												height: "100%",
												top: "15%",
												position: "absolute",
												right: "3%",
											}}>
											{button.icon}
										</span>
									</div>
								</Item>
							))}
						</Box>
					</ThemeProvider>
				</Grid>
			</Grid>
		</div>
	);
}

export default MatchMakerHomeButtonList;
