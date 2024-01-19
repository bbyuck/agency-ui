import TextInputLayout from "components/layout/TextInputLayout";

function AddressInput(props) {
	const title = "사는 곳을 알려주세요.";
	const subtitle = "본가나 회사 위치를 함께 알려주셔도 좋아요.";

	return (
		<div className='page'>
			<TextInputLayout title={title} subtitle={subtitle} {...props} />
		</div>
	);
}

export default AddressInput;
