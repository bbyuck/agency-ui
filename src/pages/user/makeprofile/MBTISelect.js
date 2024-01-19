import MBTIButtonLayout from "components/layout/MBTIButtonLayout";

function MBTISelect(props) {
	const title = "MBTI를 알려주세요.";
	const subtitle = "아래 보기에서 선택해주세요.";
	return (
		<div className='page'>
			<MBTIButtonLayout title={title} subtitle={subtitle} {...props} />
		</div>
	);
}

export default MBTISelect;
