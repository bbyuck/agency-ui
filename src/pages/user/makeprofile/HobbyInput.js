import TextInputLayout from "components/layout/TextInputLayout";

function HobbyInput(props) {
	const title = "취미를 알려주세요.";

	return (
		<div className='page'>
			<TextInputLayout title={title} {...props} />
		</div>
	);
}

export default HobbyInput;
