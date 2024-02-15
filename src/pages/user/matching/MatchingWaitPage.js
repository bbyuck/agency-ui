import { Button } from "@mui/material";
import PromptText from "components/common/PromptText";
import { requestPermission } from "config/fcmConfig";
import { useEffect, useState } from "react";
import { scrollAble } from "util";
import { scrollDisable } from "util";

function MatchingWaitPage(props) {
	const title = "잠시만 기다려주세요!";
	const subtitle = `상대가 요청을 확인중입니다.`;
	const [pushSetting, setPushSetting] = useState(false);

	useEffect(() => {
		scrollDisable();

		return () => {
			scrollAble();
		};
	}, []);

	return (
		<>
			<PromptText title={title} subtitle={subtitle} />
			<Button
				sx={{
					position: "absolute",
					left: "0",
					padding: 0,
					bottom: "15vh",
					width: "100vw",
				}}
				onClick={async () => {
					if (!pushSetting) {
						/**
						 * 1. Firebase register
						 */
						setPushSetting(true);
						await requestPermission();
						setPushSetting(false);
					}
				}}>
				PUSH 알림 받기
			</Button>
		</>
	);
}

export default MatchingWaitPage;
