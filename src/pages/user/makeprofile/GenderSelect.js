import SelectOneLayout from "components/layout/SelectOneLayout";
import { NEXT } from "constants/buttonType";
import { man, woman } from "constants/gender";

function GenderSelect(props) {
	const { next, select, data } = props;

	const selectList = [
		{
			label: "남자",
			value: man,
		},
		{
			label: "여자",
			value: woman,
		},
	];
	const title = "성별을 알려주세요.";

	return (
		<div className='page'>
			{
				<SelectOneLayout
					title={title}
					list={selectList}
					next={next}
					select={select}
					data={data}
					buttonType={NEXT}
				/>
			}
		</div>
	);
}

export default GenderSelect;
