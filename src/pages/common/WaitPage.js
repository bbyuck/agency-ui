import PromptText from "components/common/PromptText";
import { MATCH_MAKER, USER } from "constants/memberCode";
import { WAIT } from "constants/memberStatus";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { scrollAble } from "util";
import { scrollDisable } from "util";

function WaitPage(props) {
	const title = "잠시만 기다려주세요!";
	const subtitle = `${props.approver}가 확인 중입니다.`;
	const navigate = useNavigate();
	const { memberCode } = props;
	const { userStatus, matchMakerStatus } = useSelector(
		(state) => state.memberInfo,
	);

	useEffect(() => {
		scrollDisable();
		if (
			(memberCode === USER && userStatus !== WAIT) ||
			(memberCode === MATCH_MAKER && matchMakerStatus !== WAIT)
		) {
			navigate("/", { replace: true });
		}

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

export default WaitPage;
