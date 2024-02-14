import { Box, Button, Grid } from "@mui/material";
import ProfileCard from "components/common/ProfileCard";
import { useEffect, useState } from "react";
import http from "api";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setRequestReceivedDialogOpen } from "store/slice/status";
import messages from "messages";
import HomeHeader from "components/common/header/HomeHeader";
import RequestReceivedAlert from "components/user/RequestReceivedAlert";
import { CONFIRMED } from "constants/matchingRequestStatus";
import { setMemberStatus } from "store/slice/memberInfo";
import Confirm from "components/common/Confirm";
import { REQUEST_CONFIRMED, REQUEST_RECEIVED } from "constants/memberStatus";

function MatchingRequestReceivedPage() {
	const [profile, setProfile] = useState(null);
	const dispatch = useDispatch();
	const { memberStatus } = useSelector((state) => state.memberInfo);

	const [rejectConfirmOpen, setRejectConfrimOpen] = useState(false);
	const [receviedRequestId, setReceivedRequestId] = useState(null);

	const rejectConfirmContents = `만약, 거절하시면 요청보내신 분의 프로필은 앞으로 확인하실 수 없어요.`;
	const rejectRequest = async () => {
		http
			.post("/v1/matching/request/reject")
			.then((response) => {
				dispatch(setMemberStatus(response.data.data.memberStatus));
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

	const acceptRequest = () => {
		http
			.post("/v1/matching/request/accept", { id: receviedRequestId })
			.then((response) => {
				dispatch(setMemberStatus(response.data.data.memberStatus));
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

	useEffect(() => {
		if (memberStatus === REQUEST_CONFIRMED) {
			const searchReceivedRequest = () => {
				http
					.get("/v1/matching/request/received")
					.then((response) => {
						const { senderProfileInfo, matchingRequestStatus, id } =
							response.data.data;
						if (matchingRequestStatus === CONFIRMED) {
							setReceivedRequestId(id);
							setProfile(senderProfileInfo);
						} else {
							dispatch(setRequestReceivedDialogOpen(true));
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
					});
			};

			searchReceivedRequest();
		} else if (memberStatus === REQUEST_RECEIVED) {
			dispatch(setRequestReceivedDialogOpen(true));
		}
	}, [memberStatus, dispatch]);

	return (
		<>
			{profile ? (
				<>
					<HomeHeader center={"프로필"} />
					<ProfileCard profile={profile} />
					<div className={"container-profile-card-button"}>
						<Box>
							<Grid container spacing={0}>
								<Grid item xs={6}>
									<Button
										sx={{ width: "45vw" }}
										onClick={() => {
											setRejectConfrimOpen(true);
										}}
										color={"grey"}
										variant='contained'
										size='medium'>
										{"거절하기"}
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										sx={{ width: "45vw" }}
										onClick={acceptRequest}
										variant='contained'
										size='medium'>
										{"수락하기"}
									</Button>
								</Grid>
							</Grid>
						</Box>
					</div>
					<Confirm
						title={"요청을 거절할까요?"}
						contents={rejectConfirmContents}
						confirm={async () => {
							await rejectRequest();
							setRejectConfrimOpen(false);
						}}
						confirmOpen={rejectConfirmOpen}
						closeConfirmDialog={() => {
							setRejectConfrimOpen(false);
						}}
					/>
				</>
			) : null}
			<RequestReceivedAlert />
		</>
	);
}

export default MatchingRequestReceivedPage;
