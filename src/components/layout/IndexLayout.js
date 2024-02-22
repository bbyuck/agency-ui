import { Radio } from "@mui/material";
import "style/common/Common.css";
import LayoutButton from "./LayoutButton";

function IndexLayout(props) {
	const { title, subtitle, next, data, buttonInfo } = props;
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
				<LayoutButton buttonInfo={buttonInfo} data={data} next={next} />
			</div>
		</>
	);
}

export default IndexLayout;
