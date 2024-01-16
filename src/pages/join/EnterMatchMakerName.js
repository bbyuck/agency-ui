import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { MATCH_MAKER, USER } from "constants/memberType";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { setMatchMakerName } from "store/slice/joinInfo";
import { Fragment, useEffect, useState } from "react";
import http from "api";
import { setAlert } from "store/slice/status";
import messages from "messages";
import { useNavigate } from "react-router-dom";
import { setHeaderComponent } from "store/slice/header";

function EnterMatchMakerName() {
	const joinInfo = useSelector((state) => state.joinInfo);
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!joinInfo.memberType) {
			navigate("/");
		}
	});
	const dispatch = useDispatch();
	/**
	 * ========== header 설정 =========
	 */
	useEffect(() => {
		dispatch(
			setHeaderComponent({
				leftComponent: "back",
				rightComponent: "none",
			}),
		);
	}, []);

	const [confirmOpen, setConfirmOpen] = useState(false);

	const closeConfirmDialog = () => {
		setConfirmOpen(false);
	};

	const headerPhrase =
		joinInfo.memberType === MATCH_MAKER
			? "닉네임을 알려주세요."
			: joinInfo.memberType === USER
			? "어느 분께 소개를 받으세요?"
			: null;
	const subPhrase =
		joinInfo.memberType === MATCH_MAKER
			? null
			: joinInfo.memberType === USER
			? "주선자의 닉네임을 입력해주세요."
			: null;

	const buttonDisabled = joinInfo.matchMakerName === null;
	// joinInfo.memberType === MATCH_MAKER
	// 	? joinInfo.matchMakerName === null
	// 	: joinInfo.memberType === USER
	// 	? false
	// 	: false;

	const start = () => {
		if (joinInfo.memberType === MATCH_MAKER) {
			matchMakerJoin();
		} else if (joinInfo.memberType === USER) {
			if (!joinInfo.matchMakerName) {
				if (confirmOpen) {
					userJoin();
				} else {
					setConfirmOpen(true);
				}
			} else {
				userJoin();
			}
		}
	};

	const matchMakerJoin = () => {
		http
			.post("/v1/matchmaker/join", {
				kakaoId: auth.kakaoId,
				matchMakerName: joinInfo.matchMakerName,
			})
			.then((response) => {
				console.log(response);
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
			});
	};
	const userJoin = () => {
		http
			.post("/v1/user/join", {
				kakaoId: auth.kakaoId,
				matchMakerName: joinInfo.matchMakerName,
			})
			.then((response) => {
				console.log(response);
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
			});
	};

	return (
		<div className='page'>
			<div>
				<div style={{ position: "relative", textAlign: "left", marginLeft: "5%" }}>
					<div
						style={{
							position: "relative",
							marginTop: "20%",
							fontWeight: 900,
							fontSize: "30px",
						}}>
						{headerPhrase}
					</div>
					<div style={{ position: "relative", fontSize: "15px", height: "15px" }}>
						{subPhrase}
					</div>
					<div
						className='container-input-area'
						style={{
							position: "relative",
							marginTop: "20%",
							fontSize: "20px",
							width: "95%",
						}}>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: { sm: "1fr 1fr 1fr" },
								gap: 2,
							}}>
							<TextField
								label='닉네임'
								variant='standard'
								onChange={(e) => {
									dispatch(setMatchMakerName({ matchMakerName: e.target.value }));
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										start();
									}
								}}
							/>
						</Box>
					</div>
				</div>
				<div
					className='button-area'
					style={{ position: "fixed", bottom: "7.5%", width: "100%" }}>
					<Button
						onClick={start}
						variant='contained'
						disabled={buttonDisabled}
						size='medium'
						style={{ width: "80%" }}>
						확인
					</Button>
				</div>
			</div>

			<Fragment>
				<Dialog
					open={confirmOpen}
					// onClose={closeConfirmDialog}
					aria-labelledby='responsive-dialog-title'
					fullWidth>
					<DialogTitle
						id='responsive-dialog-title'
						style={{ fontWeight: "700", width: "100%" }}>
						{"주선자를 알려주세요!"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText style={{ fontSize: "15px" }}>
							주선자를 입력하지 않았습니다.
							<br />
							주선자가 없을 경우 매칭이 어려워질 수 있습니다.
							<br />
							<br />
							이대로 진행할까요?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button autoFocus onClick={closeConfirmDialog} style={{ color: "red" }}>
							취소
						</Button>
						<Button onClick={start} autoFocus>
							확인
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		</div>
	);
}

export default EnterMatchMakerName;
