import { useEffect, useState } from "react";
import { Box, Button, Divider, Grid } from "@mui/material";
import ProfileCardBadge from "./ProfileCardBadge";
import http from "api";
import { useDispatch } from "react-redux";
import { setAlert } from "store/slice/status";

function ProfileCard(props) {
	const [photoExchanged, setPhotoExchanged] = useState(false);
	const dispatch = useDispatch();
	const { profile } = props;

	const sendRequest = () => {
		http
			.post("/v1/matching/request", {
				id: profile.id,
			})
			.then((response) => {
				console.log(response);
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
				console.log(error);
			});
	};

	return (
		<div>
			{photoExchanged ? (
				<>
					<div className={"profile-card-image"}>
						<img alt={"이미지"} src={"not found"} />
					</div>
					<Divider
						sx={{ width: "90vw", position: "relative", left: "5vw", top: "1vh" }}
					/>
				</>
			) : null}

			<div className={"container-profile-card-info"}>
				{/* <div className={"profile-card-badges"}>
					<ProfileCardBadge badges={profile.badges} />
				</div> */}

				<Box>
					<Grid container spacing={2}>
						<Grid item xs={5}>
							<div className={"profile-card-info"}>
								<div className={"profile-card-property-key"}>나이</div>
								<div>{profile.age}</div>
							</div>
						</Grid>
						<Grid item xs={7}>
							<div className={"profile-card-info"}>
								<div className={"profile-card-property-key"}>사는 곳</div>
								<div>{profile.address}</div>
							</div>
						</Grid>
						<Grid item xs={5}>
							<div className={"profile-card-info"}>
								<div className={"profile-card-property-key"}>키</div>
								<div>{profile.height}</div>
							</div>
						</Grid>
						<Grid item xs={7}>
							<div className={"profile-card-info"}>
								<div className={"profile-card-property-key"}>하는 일</div>
								<div>{profile.job}</div>
							</div>
						</Grid>

						<Grid item xs={12}>
							<div className={"profile-card-info"}>
								<div className={"profile-card-property-key"}>취미</div>
								<div>{profile.hobby}</div>
							</div>
						</Grid>

						<Grid item xs={12}>
							<div className={"profile-card-info"}>
								<div className={"profile-card-property-key"}>원하는 이성상</div>
								<div>{profile.idealType}</div>
							</div>
						</Grid>
						<Grid item xs={12}>
							<div className={"profile-card-info"}>
								<div className={"profile-card-property-key"}>자기소개</div>
								<div>{profile.selfDescription}</div>
							</div>
						</Grid>
					</Grid>
				</Box>
			</div>
			<div className={"container-profile-card-button"}>
				<Box></Box>
				<Button
					onClick={sendRequest}
					variant='contained'
					size='medium'
					style={{ width: "90vw" }}>
					{"매칭 요청"}
				</Button>
			</div>
		</div>
	);
}

export default ProfileCard;
