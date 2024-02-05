import ProfileListCard from "components/common/ProfileListCard";
import { useEffect, useState } from "react";
import "style/common/Main.css";
import http from "api";
import { useDispatch } from "react-redux";
import { setAlert } from "store/slice/status";
import messages from "messages";
import { Box, Button, IconButton } from "@mui/material";
import PromptText from "components/common/PromptText";
import SearchIcon from "@mui/icons-material/YoutubeSearchedForOutlined";

function Main(props) {
	const { reset, select } = props;
	const [profiles, setProfiles] = useState([]);
	const [searching, setSearching] = useState(false);
	const [init, setInit] = useState(true);

	const dispatch = useDispatch();

	const search = () => {
		if (searching) {
			return;
		}

		setSearching(true);

		http
			.get("/v1/profile")
			.then((response) => {
				setProfiles(response.data.data);
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
				console.log(error);
			})
			.finally(() => {
				setSearching(false);
				if (init) {
					setInit(false);
				}
			});
	};

	useEffect(() => {
		reset();

		search();

		// document.querySelector(".App").scrollTo(0, 0);
	}, [dispatch]);

	return (
		<>
			{init ? null : profiles.length === 0 ? (
				<Box>
					<PromptText
						title={"매칭 가능한 사람이 없어요."}
						subtitle={"잠시 후 다시 시도해주세요."}
					/>
					<IconButton
						onClick={search}
						sx={{
							position: "relative",
							width: "100vw",
							height: "100vw",
							bottom: "70vh",
						}}>
						<SearchIcon color={"primary"} />
					</IconButton>
				</Box>
			) : (
				<div className={"page"}>
					<div
						style={{
							position: "relative",
							top: "6vh",
						}}>
						<div className={"container-main-profile-card-list"}>
							{profiles.map((profile, index) => (
								<ProfileListCard
									select={select}
									profile={profile}
									key={`profile-card-${index}`}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Main;
