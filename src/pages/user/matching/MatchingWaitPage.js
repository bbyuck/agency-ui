import PromptText from "components/common/PromptText";
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
			<PromptText title={title} subtitle={subtitle} />
		</>
	);
}

export default MatchingWaitPage;
