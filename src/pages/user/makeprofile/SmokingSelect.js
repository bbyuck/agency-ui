import SelectOneLayout from "components/layout/SelectOneLayout";

function SmokingSelect(props) {
	const { next, select, data } = props;

	const title = "마지막 질문이에요!";
	const subtitle = "담배 피우세요?";
	const selectList = [
		{
			label: "흡연자에요.",
			value: true,
		},
		{
			label: "비흡연자에요.",
			value: false,
		},
	];
	return (
		<div className='page'>
			<SelectOneLayout
				title={title}
				subtitle={subtitle}
				list={selectList}
				next={next}
				select={select}
				data={data}
			/>
		</div>
	);
}

export default SmokingSelect;
