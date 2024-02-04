import { useEffect } from "react";
import { scrollAble } from "util";
import { scrollDisable } from "util";

function WaitPage(props) {
	const title = "잠시만 기다려주세요!";
	const subtitle = `${props.approver}가 가입 승인을 위한 확인 작업 중입니다.`;

	useEffect(() => {
		scrollDisable();

		return () => {
			scrollAble();
		};
	}, []);

	return (
		<>
			<div className='layout-container'>
				<div className='layout-contents'>
					<div className='layout-title' style={{ fontSize: "30px" }}>
						{title}
					</div>
					<div
						className='layout-subtitle'
						style={{ height: "15px", fontSize: "15px" }}>
						{subtitle}
					</div>
				</div>
			</div>
		</>
	);
}

export default WaitPage;
