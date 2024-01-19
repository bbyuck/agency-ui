import SelectNativeLayout from "components/layout/SelectNativeLayout";

function AgeSelect(props) {
	const title = "나이를 알려주세요.";
	const subtitle = "출생연도를 선택해주세요.";

	return (
		<div className='page'>
			<SelectNativeLayout title={title} subtitle={subtitle} {...props} />
		</div>
	);
}

export default AgeSelect;
