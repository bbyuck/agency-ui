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

function MatchingRequestReceivedPage() {
	const [profile, setProfile] = useState(null);
	const dispatch = useDispatch();
	const { requestReceivedConfirmed } = useSelector((state) => state.status);

	useEffect(() => {
		const searchReceivedRequest = () => {
			http
				.get("/v1/matching/request/received")
				.then((response) => {
					const senderProfileInfo = response.data.data;
					if (senderProfileInfo.matchingRequestStatus === CONFIRMED) {
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
	}, [requestReceivedConfirmed]);

	return (
		<>
			{profile ? (
				<>
					<HomeHeader center={"요청자 프로필"} />
					<ProfileCard profile={profile} />
					<div className={"container-profile-card-button"}>
						<Box>
							<Grid container spacing={0}>
								<Grid item xs={6}>
									<Button
										sx={{ width: "45vw" }}
										onClick={() => {}}
										color={"grey"}
										variant='contained'
										size='medium'>
										{"거절하기"}
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										sx={{ width: "45vw" }}
										onClick={() => {}}
										variant='contained'
										size='medium'>
										{"소개받기"}
									</Button>
								</Grid>
							</Grid>
						</Box>
					</div>
				</>
			) : null}
			<RequestReceivedAlert />
		</>
	);
}

export default MatchingRequestReceivedPage;
