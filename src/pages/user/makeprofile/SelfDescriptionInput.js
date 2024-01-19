import TextInputLayout from "components/layout/TextInputLayout";

function SelfDescriptionInput(props) {
	const title = "본인을 간단히 소개해주세요.";
	const subtitle = "음주 여부, 성격, 집순집돌이 혹은 밖순밖돌이인지 등";

	return (
		<div className='page'>
			<TextInputLayout title={title} subtitle={subtitle} long={true} {...props} />
		</div>
	);
}

export default SelfDescriptionInput;
