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

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function ReceivedRequest(props) {
	const { open, handleClose } = props;

	return (
		<Fragment>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<AppBar sx={{ position: "relative" }}>
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
				<List>
					<ListItemButton>
						<ListItemText primary='Phone ringtone' secondary='Titania' />
					</ListItemButton>
					<Divider />
					<ListItemButton>
						<ListItemText
							primary='Default notification ringtone'
							secondary='Tethys'
						/>
					</ListItemButton>
				</List>
			</Dialog>
		</Fragment>
	);
}

export default ReceivedRequest;
