import TextInputLayout from "components/layout/TextInputLayout";

function JobInput(props) {
	const title = "어떤 일을 하시나요?";
	const subtitle = "직업이나 하시는 일을 알려주세요.";
	return (
		<div className='page'>
			<TextInputLayout title={title} subtitle={subtitle} {...props} />
		</div>
	);
}

export default JobInput;
