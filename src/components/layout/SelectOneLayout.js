import { useEffect, useState } from "react";
import { Radio } from "@mui/material";
import "style/common/Common.css";
import LayoutButton from "./LayoutButton";

function SelectOneLayout(props) {
	const { title, subtitle, list, next, select, data, buttonInfo } = props;

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
					<div
						className='layout-select-area'
						style={{ position: "relative", top: "5vh", fontSize: "20px" }}>
						{list.map((button, index) => {
							return (
								<div
									className='layout-select-button'
									onClick={() => {
										select(list[index].value);
									}}
									key={`layout-select-button-${index}`}
									style={{
										position: "relative",
										marginTop: "5vh",
										fontWeight: "700",
										height: "55px",
									}}>
									<div
										className='layout-select-label'
										style={{
											position: "absolute",
										}}>
										{button.label}
									</div>
									<div
										className='layout-select-radio'
										style={{
											position: "absolute",
											right: "5vw",
										}}>
										<Radio checked={data === list[index].value} />
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<LayoutButton buttonInfo={buttonInfo} data={data} next={next} />
			</div>
		</>
	);
}

export default SelectOneLayout;
