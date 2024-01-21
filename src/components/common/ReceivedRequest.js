import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Fragment, forwardRef } from "react";
import ProfileListCard from "./ProfileListCard";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function ReceivedRequest(props) {
	const { open, handleClose } = props;

	const profiles = [
		{
			id: "encryptedId1",
			age: "94",
			address: "서울 화곡동",
			job: "개발자",
			height: 178,
			mbti: "ISFP",
			status: "NEW",
			smoking: false,
			allowPhotoExchange: true,
		},
		{
			id: "encryptedId2",
			age: "94",
			address: "동탄",
			job: "삼성전자",
			height: 182,
			mbti: "ENTP",
			status: "NEW",
			smoking: true,
			allowPhotoExchange: false,
		},
		{
			id: "encryptedId3",
			age: "빠른 92",
			address: "인천",
			job: "LG 마그나 연구원",
			height: 178,
			mbti: "ISTP",
			status: "NEW",
			smoking: true,
			allowPhotoExchange: true,
		},
		{
			id: "encryptedId4",
			age: "94",
			address: "인천",
			job: "LG 마그나 연구원",
			height: 178,
			mbti: "ISTP",
			status: "CONFIRMED",
			smoking: true,
			allowPhotoExchange: true,
		},
	];

	return (
		<Fragment>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<AppBar sx={{ position: "fixed" }}>
					<Toolbar sx={{ backgroundColor: "white", color: "primary" }}>
						<IconButton
							edge='start'
							color='second'
							onClick={handleClose}
							aria-label='close'>
							<CloseIcon />
						</IconButton>
						<Typography
							sx={{ ml: 2, flex: 1 }}
							variant='h6'
							component='div'></Typography>
					</Toolbar>
				</AppBar>
				<div
					style={{
						position: "relative",
						top: "15vh",
					}}>
					<div className={"container-main-profile-card-list"}>
						{profiles.map((profile, index) => (
							<ProfileListCard
								select={() => {
									console.log("select");
								}}
								profile={profile}
								dot={profile.status === "NEW"}
								key={`profile-card-${index}`}
							/>
						))}
					</div>
				</div>
			</Dialog>
		</Fragment>
	);
}

export default ReceivedRequest;
