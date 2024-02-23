import PropTypes from "prop-types";
import FixSomeoneUpIcon from "@mui/icons-material/Diversity1Outlined";
import MatchMakingIcon from "@mui/icons-material/Diversity3Outlined";
import { useEffect, useState } from "react";
import { Paper, Tab, Tabs } from "@mui/material";
import UserRoutes from "route/authenticated/UserRoutes";
import MatchMakerRoutes from "route/authenticated/MatchMakerRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PROFILE_MAKING, TEMP } from "constants/memberStatus";
import { TransitionGroup } from "react-transition-group";
import { setTab } from "store/slice/page";

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
	const { tab } = useSelector((state) => state.page);
	const { userStatus, matchMakerStatus } = useSelector(
		(state) => state.memberInfo,
	);
	const dispatch = useDispatch();

	const handleChange = (event, newValue) => {
		dispatch(setTab(newValue));
	};

	const hideTabs = () => {
		return (
			(userStatus === TEMP && matchMakerStatus === TEMP) ||
			userStatus === PROFILE_MAKING
		);
	};

	return (
		<div>
			<CustomTabPanel value={tab} index={0}>
				{tab === 0 ? <UserRoutes /> : null}
			</CustomTabPanel>
			<CustomTabPanel value={tab} index={1}>
				{tab === 1 ? <MatchMakerRoutes /> : null}
			</CustomTabPanel>
			{hideTabs() ? null : (
				<Paper
					sx={{
						position: userStatus === PROFILE_MAKING ? "absolute" : "fixed",
						bottom: 0,
						left: 0,
						right: 0,
						width: "100vw",
					}}
					elvation={3}>
					<Tabs
						value={tab}
						onChange={handleChange}
						aria-label='nav tabs example'
						variant='fullWidth'
						role='navigation'>
						<Tab icon={<FixSomeoneUpIcon />} label='소개받기' {...a11yProps(0)} />
						<Tab icon={<MatchMakingIcon />} label='소개해주기' {...a11yProps(1)} />
					</Tabs>
				</Paper>
			)}
		</div>
	);
}

export default HomeTabs;
