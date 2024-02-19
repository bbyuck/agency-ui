import { Button, Card, Dialog, Grid, IconButton } from "@mui/material";
import { Fragment, useState } from "react";
import http from "api";
import { useDispatch } from "react-redux";
import { setAlert } from "store/slice/status";
import messages from "messages";

function MatchMakerLinkShare() {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const openDialog = () => {
		setOpen(true);
	};
	const closeDialog = () => {
		setOpen(false);
	};

	const getLink = () => {
		return http.get("/v1/matchmaker/link");
	};

	const shareIconButtons = [
		{
			key: "icon-DUMMY1",
			value: null,
			label: null,
		},
		{
			key: "icon-KAKAOTALK",
			value: `${process.env.PUBLIC_URL}/assets/images/kakaotalk_sharing_btn_medium.png`,
			label: "카카오톡",
			handler: () => {
				getLink()
					.then((response) => {
						debugger;
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
			},
		},
		{
			key: "icon-COPY",
			value: `${process.env.PUBLIC_URL}/assets/icons/copy_icon_60.png`,
			label: "링크 복사",
			handler: () => {
				getLink()
					.then((response) => {
						window.navigator.clipboard.writeText(response.data.data).then(() => {
							// 복사가 완료되면 호출된다.
							dispatch(
								setAlert({
									alert: {
										open: true,
										type: "success",
										message: "링크가 복사되었습니다.",
									},
								}),
							);
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
			},
		},
		{
			key: "icon-DUMMY2",
			value: null,
			label: null,
		},
	];

	return (
		<>
			<Button
				sx={{
					position: "absolute",
					left: "0",
					padding: 0,
					top: "25vh",
					width: "100vw",
				}}
				onClick={openDialog}>
				링크 공유
			</Button>
			<Fragment>
				<Dialog
					open={open}
					onClose={closeDialog}
					aria-labelledby='responsive-dialog-title'
					fullWidth>
					<Card sx={{ height: "110px" }}>
						<Grid container spacing={4}>
							{shareIconButtons.map((shareIconButton) => {
								return (
									<Grid
										key={shareIconButton.key}
										item
										xs={3}
										sx={{ textAlign: "center" }}>
										<IconButton sx={{ width: "100%" }} onClick={shareIconButton.handler}>
											<img src={shareIconButton.value} alt={shareIconButton.label} />
											<span
												style={{ fontSize: "13px", position: "absolute", top: "100%" }}>
												{shareIconButton.label}
											</span>
										</IconButton>
									</Grid>
								);
							})}
						</Grid>
					</Card>
				</Dialog>
			</Fragment>
		</>
	);
}

export default MatchMakerLinkShare;
