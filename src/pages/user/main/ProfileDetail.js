import ProfileCard from "components/common/ProfileCard";
import { useEffect, useState } from "react";
import "style/common/ProfileCard.css";
import http from "api";
import BeforeRequestSendAlert from "components/user/BeforeRequestSendAlert";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAlert } from "store/slice/status";
import { setMemberStatus } from "store/slice/memberInfo";

function ProfileDetail(props) {
	const [profile, setProfile] = useState(null);
	const { selectedProfileId } = props;
	const [openConfirm, setOpenConfirm] = useState(false);
	const dispatch = useDispatch();
	const close = () => {
		setOpenConfirm(false);
	};

	document.querySelector(".App").scrollTo(0, 0);

	useEffect(() => {
		/**
		 * 선택된 프로필 id로 조회 api 호출
		 */
		http
			.get(`/v1/profile/detail/${selectedProfileId}`)
			.then((response) => {
				setProfile(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});

		// setProfile(testData);
		// window.scrollTo(0, 0);

		return () => {
			document.querySelector(".App").scrollTo(0, 0);
		};
	}, [selectedProfileId]);

	const sendRequest = () => {
		setOpenConfirm(false);

		http
			.post("/v1/matching/request", {
				id: profile.id,
			})
			.then((response) => {
				console.log(response);
				dispatch(setMemberStatus(response.data.data.memberStatus));
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "success",
							message: "요청을 성공적으로 보냈습니다.",
						},
					}),
				);
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
		<div className='page' id={"profile-detail"}>
			{profile ? <ProfileCard profile={profile} /> : null}
			{profile ? (
				<>
					<div className={"container-profile-card-button"}>
						<Button
							onClick={() => {
								setOpenConfirm(true);
							}}
							variant='contained'
							size='medium'
							style={{ width: "90vw" }}>
							{"매칭 요청"}
						</Button>
					</div>
					<BeforeRequestSendAlert
						open={openConfirm}
						close={close}
						sendRequest={sendRequest}
					/>
				</>
			) : null}
		</div>
	);
}

export default ProfileDetail;
