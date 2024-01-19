import SelectOneLayout from "components/layout/SelectOneLayout";

function SmokingSelect(props) {
	const title = "마지막 질문이에요!";
	const subtitle = "담배 피우세요?";
	const selectList = [
		{
			label: "흡연자에요.",
			value: "1",
		},
		{
			label: "비흡연자에요.",
			value: "0",
		},
	];
	return (
		<div className='page'>
			<SelectOneLayout
				title={title}
				subtitle={subtitle}
				list={selectList}
				{...props}
			/>
		</div>
	);
}

export default SmokingSelect;
