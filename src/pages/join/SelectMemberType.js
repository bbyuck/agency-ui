import { MATCH_MAKER, USER } from "constants/memberType";
import SelectOneLayout from "components/layout/SelectOneLayout";
import { NEXT } from "constants/buttonType";

function SelectMatchType(props) {
	const selectList = [
		{
			label: "소개해 주러 왔어요",
			value: MATCH_MAKER,
		},
		{
			label: "소개받으러 왔어요",
			value: USER,
		},
	];

	const title = "만나서 반가워요!";
	const subtitle = "어떻게 오셨어요?";

	return (
		<div className='page'>
			<SelectOneLayout
				title={title}
				subtitle={subtitle}
				list={selectList}
				buttonType={NEXT}
				{...props}
			/>
		</div>
	);
}

export default SelectMatchType;
