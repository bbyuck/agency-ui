import ShortInputLayout from "components/layout/ShortInputLayout";

function AgeInput(props) {
	const title = "나이를 알려주세요.";
	const subtitle = "출생연도를 입력해주세요.";

	return (
		<div className='page'>
			<ShortInputLayout title={title} subtitle={subtitle} {...props} />
		</div>
	);
}

export default AgeInput;
