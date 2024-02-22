import PromptText from "components/common/PromptText";
import LayoutButton from "components/layout/LayoutButton";
import { NEXT } from "constants/buttonType";
import { useEffect, useState } from "react";

function MakeProfileIndex(props) {
	const { next } = props;
	const [data, setData] = useState(1);

	useEffect(() => {
		return () => {
			setData(null);
		};
	}, []);

	return (
		<>
			<PromptText
				title={"프로필을 작성해주세요."}
				subtitle={"소개를 받기 위해서는 프로필이 필요합니다."}
			/>
			<LayoutButton buttonInfo={{ type: NEXT }} data={data} next={next} />
		</>
	);
}

export default MakeProfileIndex;
