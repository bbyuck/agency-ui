import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	color: theme.palette.text.secondary,
	height: 30,
	lineHeight: "30px",
	borderRadius: "15px;",
}));

function ProfileCardBadge(props) {
	const { badges } = props;

	return (
		<>
			<Box
				sx={{
					flexGrow: 1,
					bgcolor: "background.default",
				}}>
				<Grid container spacing={2}>
					{badges.map((badge, index) => (
						<Grid key={`profile-card-badge-${badge}`} item xs={3}>
							<Item elevation={7}>{badge}</Item>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
}

export default ProfileCardBadge;
