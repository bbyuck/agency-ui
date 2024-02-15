import { Button } from "@mui/material";
import PromptText from "components/common/PromptText";
import { requestPermission } from "config/fcmConfig";
import { useEffect, useState } from "react";
import { scrollAble } from "util";
import { scrollDisable } from "util";

function MatchingAcceptedPage(props) {
	const title = "잠시만 기다려주세요!";
	const subtitle = `상대의 주선자로부터 상대의 연락처를 받아오는 중입니다.`;

	useEffect(() => {
		scrollDisable();

		return () => {
			scrollAble();
		};
	}, []);

	return (
		<>
			<PromptText title={title} subtitle={subtitle} />
		</>
	);
}

export default MatchingAcceptedPage;
