import TextInputLayout from "components/layout/TextInputLayout";

function EnterMatchMakerCode(props) {
	const title = "어느 분께 소개를 받으세요?";

	const subtitle = "주선자에게 전달받은 코드를 입력해주세요.";

	return (
		<div className='page'>
			<TextInputLayout title={title} subtitle={subtitle} {...props} />
		</div>
	);
}

export default EnterMatchMakerCode;
