import SelectOneLayout from "components/layout/SelectOneLayout";
import { man, woman } from "constants/gender";

function GenderSelect(props) {
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
			{<SelectOneLayout title={title} list={selectList} {...props} />}
		</div>
	);
}

export default GenderSelect;
