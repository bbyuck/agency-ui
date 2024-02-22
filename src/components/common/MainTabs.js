import PropTypes from "prop-types";
import FixSomeoneUpIcon from "@mui/icons-material/Diversity1Outlined";
import MatchMakingIcon from "@mui/icons-material/Diversity3Outlined";
import { useState } from "react";
import { Paper, Tab, Tabs } from "@mui/material";
import UserRoutes from "route/authenticated/UserRoutes";
import MatchMakerRoutes from "route/authenticated/MatchMakerRoutes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PROFILE_MAKING } from "constants/memberStatus";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <>{children}</>}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function HomeTabs() {
	const [value, setValue] = useState(0);
	const { userStatus } = useSelector((state) => state.memberInfo);

	const navigate = useNavigate();

	const handleChange = (event, newValue) => {
		setValue(newValue);
		if (newValue === 0) {
			navigate("/user/home", { replace: true });
		} else if (newValue === 1) {
			navigate("/matchmaker/home", { replace: true });
		}
	};

	return (
		<div>
			<CustomTabPanel value={value} index={0}>
				<UserRoutes />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<MatchMakerRoutes />
			</CustomTabPanel>
			<Paper
				sx={{
					position: userStatus === PROFILE_MAKING ? "absolute" : "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					width: "100vw",
					zIndex: 0,
				}}
				elvation={3}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='nav tabs example'
					variant='fullWidth'
					role='navigation'>
					<Tab icon={<FixSomeoneUpIcon />} label='소개받기' {...a11yProps(0)} />
					<Tab icon={<MatchMakingIcon />} label='소개해주기' {...a11yProps(1)} />
				</Tabs>
			</Paper>
		</div>
	);
}

export default HomeTabs;
