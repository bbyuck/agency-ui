import { MATCHING, MATCHING_CONFIRMED } from "constants/memberStatus";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "api";
import { setAlert } from "store/slice/status";
import messages from "messages";
import { setMemberStatus } from "store/slice/memberInfo";
import ProfileCard from "components/common/ProfileCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import HomeHeader from "components/common/header/HomeHeader";
import { Box, Button, Grid } from "@mui/material";
import Confirm from "components/common/Confirm";

function MatchingPage() {
	const { memberStatus } = useSelector((state) => state.memberInfo);
	const [profile, setProfile] = useState(null);
	const [matchingStatus, setMatchingStatus] = useState(null);
	const [matchingId, setMatchingId] = useState(null);

	const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
	const cancelConfirmContents = `만약, 취소하시면 상대의 프로필은 앞으로 확인하실 수 없어요.`;

	const dispatch = useDispatch();

	const cancelMatching = async () => {
		http
			.post("/v1/matching/cancel", {
				id: matchingId,
			})
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

	const successMatching = () => {
		http
			.post("/v1/matching/complete", {
				id: matchingId,
			})
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
		if (memberStatus === MATCHING) {
			http
				.post("/v1/matching/confirm")
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
		} else if (memberStatus === MATCHING_CONFIRMED) {
			http
				.get("/v1/matching")
				.then((response) => {
					setProfile(response.data.data.opponentProfileInfo);
					setMatchingStatus(response.data.data.matchingStatus);
					setMatchingId(response.data.data.id);
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
		}
	}, [memberStatus, dispatch]);

	return (
		<>
			{memberStatus === MATCHING_CONFIRMED && profile ? (
				<>
					<HomeHeader center={"매칭중"} />
					<div
						style={{
							width: "100vw",
							height: "calc(100vw + 20vh)",
							position: "relative",
							top: "15vh",
							marginLeft: 0,
						}}>
						<Carousel
							showArrows={false}
							showStatus={false}
							showIndicators={true}
							infiniteLoop={false}
							showThumbs={false}
							useKeyboardArrows={false}
							autoPlay={false}
							stopOnHover={false}
							swipeable={true}
							dynamicHeight={false}
							emulateTouch={true}
							autoFocus={false}
							selectedItem={0}
							interval={2000}
							transitionTime={350}
							swipeScrollTolerance={2}>
							{profile.photoData.photoDataList.map((photo, index) => {
								return (
									<div
										style={{
											width: "100vw",
											height: "100%",
											position: "relative",
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
										}}
										key={`image-downloaded-${index}`}>
										<img
											alt={photo.id}
											src={`data:image/png;base64,${photo.physicalData}`}
											style={{
												width: "90vw",
												height: "calc(100vw + 10vh)",
												objectFit: "contain",
											}}
										/>
									</div>
								);
							})}
						</Carousel>
					</div>
					<ProfileCard profile={profile} />

					<div className={"container-profile-card-button"}>
						<Box>
							<Grid container spacing={0}>
								<Grid item xs={6}>
									<Button
										sx={{ width: "45vw" }}
										onClick={() => {
											setCancelConfirmOpen(true);
										}}
										color={"grey"}
										variant='contained'
										size='medium'>
										{"취소하기"}
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										sx={{ width: "45vw" }}
										onClick={successMatching}
										variant='contained'
										size='medium'>
										{"소개받기"}
									</Button>
								</Grid>
							</Grid>
						</Box>
					</div>
					<Confirm
						title={"매칭을 취소할까요?"}
						contents={cancelConfirmContents}
						confirm={async () => {
							await cancelMatching();
							setCancelConfirmOpen(false);
						}}
						confirmOpen={cancelConfirmOpen}
						closeConfirmDialog={() => {
							setCancelConfirmOpen(false);
						}}
					/>
				</>
			) : null}
		</>
	);
}

export default MatchingPage;
