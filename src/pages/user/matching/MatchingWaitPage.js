import { Button } from "@mui/material";
import PromptText from "components/common/PromptText";
import { requestPermission } from "config/fcmConfig";
import { useEffect } from "react";
import { scrollAble } from "util";
import { scrollDisable } from "util";

function MatchingWaitPage(props) {
	const title = "잠시만 기다려주세요!";
	const subtitle = `상대방이 요청을 확인중입니다.`;

	useEffect(() => {
		scrollDisable();

		return () => {
			scrollAble();
		};
	}, []);

	return (
		<>
			<Button
				onClick={() => {
					/**
					 * 1. Firebase register
					 */
					requestPermission();
				}}>
				푸시알람 허용
			</Button>
			<PromptText title={title} subtitle={subtitle} />
		</>
	);
}

export default MatchingWaitPage;
