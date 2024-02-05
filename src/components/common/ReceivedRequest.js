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
import { Fragment, forwardRef, useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import http from "api";
import PromptText from "./PromptText";
import HomeHeader from "./header/HomeHeader";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function ReceivedRequest(props) {
	const { open, handleClose, receivedRequest } = props;

	return (
		<Fragment>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<div className='container-header'>
					<div className='header'>
						<span style={{ left: "5vw" }}>
							<IconButton
								edge='start'
								color='second'
								onClick={handleClose}
								aria-label='close'>
								<CloseIcon />
							</IconButton>
						</span>
					</div>
				</div>

				{receivedRequest ? (
					<ProfileCard profile={receivedRequest} />
				) : (
					<PromptText title={"받은 요청이 없습니다."} />
				)}
			</Dialog>
		</Fragment>
	);
}

export default ReceivedRequest;
