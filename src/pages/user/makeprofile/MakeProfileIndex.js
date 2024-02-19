import PromptText from "components/common/PromptText";
import LayoutButton from "components/layout/LayoutButton";

function MakeProfileIndex(props) {
	return (
		<>
			<PromptText
				title={"프로필을 작성해주세요."}
				subtitle={"소개를 받기 위해서는 프로필이 필요합니다."}
			/>
			<LayoutButton {...props} />
		</>
	);
}

export default MakeProfileIndex;
