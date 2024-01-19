import TextInputLayout from "components/layout/TextInputLayout";

function IdealTypeInput(props) {
	const title = "원하는 이성상을 알려주세요.";
	const subtitle = "두루뭉술한 것보다는 디테일한 것이 좋아요.";

	return (
		<div className='page'>
			<TextInputLayout title={title} subtitle={subtitle} long={true} {...props} />
		</div>
	);
}

export default IdealTypeInput;
