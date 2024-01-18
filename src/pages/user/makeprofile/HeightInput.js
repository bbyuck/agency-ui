import NumericInputLayout from "components/layout/NumericInputLayout";

function HeightInput(props) {
	const title = "키를 알려주세요.";
	const subtitle = "소숫점은 반올림해주세요.";

	return (
		<div className='page'>
			<NumericInputLayout title={title} subtitle={subtitle} {...props} />
		</div>
	);
}

export default HeightInput;
