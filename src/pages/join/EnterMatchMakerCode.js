import { MATCH_MAKER, USER } from "constants/memberType";
import TextInputLayout from "components/layout/TextInputLayout";
import { useEffect } from "react";

function EnterMatchMakerCode(props) {
	const { memberType } = props;

	const title =
		memberType === MATCH_MAKER
			? "닉네임을 알려주세요."
			: memberType === USER
			? "어느 분께 소개를 받으세요?"
			: null;
	const subtitle =
		memberType === MATCH_MAKER
			? null
			: memberType === USER
			? "주선자에게 전달받은 코드를 입력해주세요."
			: null;

	return (
		<div className='page'>
			<TextInputLayout title={title} subtitle={subtitle} {...props} />
		</div>
	);
}

export default EnterMatchMakerCode;
