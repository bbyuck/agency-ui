import { useState } from "react";
import { Box, Divider, Grid } from "@mui/material";

function ProfileCard(props) {
	const [photoExchanged, setPhotoExchanged] = useState(false);
	const { profile } = props;

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
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<div className={"profile-card-info"}>
								<div className={"profile-card-property-key"}>나이</div>
								<div>{profile.age}</div>
							</div>
						</Grid>
						<Grid item xs={6}>
							<div className={"profile-card-info"}>
								<div className={"profile-card-property-key"}>사는 곳</div>
								<div>{profile.address}</div>
							</div>
						</Grid>
						<Grid item xs={6}>
							<div className={"profile-card-info"}>
								<div className={"profile-card-property-key"}>키</div>
								<div>{profile.height}</div>
							</div>
						</Grid>
						<Grid item xs={6}>
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
		</div>
	);
}

export default ProfileCard;
