import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Badge, Grid, IconButton } from "@mui/material";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";

export default function ProfileListCard(props) {
	const { profile, select, dot } = props;
	return (
		<Card
			variant='outlined'
			sx={{
				position: "relative",
				left: "5vw",
				width: "90vw",
				minWidth: 275,
				marginBottom: "2vh",
				borderRadius: "20px",
			}}>
			<CardContent className={"profile-list-card"}>
				<Badge
					sx={{ position: "absolute", right: "6vw", top: "3vh" }}
					variant='dot'
					invisible={!dot}
					color={"dot"}></Badge>
				<Box sx={{ width: "100%" }}>
					<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={3}>
							<div>나이</div>
						</Grid>
						<Grid item xs={9}>
							{profile.age}
						</Grid>
					</Grid>
					<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={3}>
							<div>사는 곳</div>
						</Grid>
						<Grid item xs={9}>
							{profile.address}
						</Grid>
					</Grid>
					<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={3}>
							<div>하는 일</div>
						</Grid>
						<Grid item xs={9}>
							{profile.job}
						</Grid>
					</Grid>
					<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={3}>
							<div>키</div>
						</Grid>
						<Grid item xs={9}>
							{profile.height}
						</Grid>
					</Grid>
					<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={3}>
							<div>흡연 여부</div>
						</Grid>
						<Grid item xs={9}>
							{profile.smoking ? "O" : "X"}
						</Grid>
					</Grid>
					<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={3}>
							<div>사진 교환</div>
						</Grid>
						<Grid item xs={9}>
							{profile.allowPhotoExchange ? "O" : "X"}
						</Grid>
					</Grid>
				</Box>
			</CardContent>
			<CardActions sx={{ justifyContent: "right" }}>
				<IconButton
					color='primary'
					size='small'
					aria-label='add to favorites'
					onClick={() => {
						select(profile.id);
					}}>
					<ReadMoreOutlinedIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
