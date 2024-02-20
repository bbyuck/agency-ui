import { useEffect } from "react";
import { scrollAble } from "util";
import { scrollDisable } from "util";

function PromptText(props) {
	const { title, subtitle } = props;

	useEffect(() => {
		scrollDisable();

		return () => {
			scrollAble();
		};
	}, []);

	return (
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
	);
}

export default PromptText;
