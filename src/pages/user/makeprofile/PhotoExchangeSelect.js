import SelectOneLayout from "components/layout/SelectOneLayout";
import { NEXT } from "constants/buttonType";
import { no, yes } from "constants/photoExchange";

function PhotoExchangeSelect(props) {
	const { next, select, data } = props;

	const title = "사진 교환 괜찮으세요?";
	const subtitle = "괜찮다면 매칭 시 다시 물어볼게요.";
	const selectList = [
		{
			label: "좋아요.",
			value: yes,
		},
		{
			label: "사진 교환은 안 할래요.",
			value: no,
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
				buttonType={NEXT}
			/>
		</div>
	);
}

export default PhotoExchangeSelect;
