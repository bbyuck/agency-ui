import { Box, Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import "style/common/Common.css";
import LayoutButton from "./LayoutButton";
import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";

const NumericFormatCustom = forwardRef(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props;

		return (
			<NumericFormat
				{...other}
				isAllowed={(values) => {
					const { floatValue } = values;
					return !floatValue ? true : 0 < floatValue && floatValue < 250;
				}}
				getInputRef={ref}
				onValueChange={(values) => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					});
				}}
				valueIsNumericString
			/>
		);
	},
);

NumericFormatCustom.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

function NumericInputLayout(props) {
	const { next, buttonInfo, input, data, title, subtitle, label } = props;

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
						className='layout-input-area'
						style={{ position: "relative", top: "10vh", fontSize: "20px" }}>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: { sm: "1fr 1fr 1fr" },
								gap: 2,
								width: "90vw",
							}}>
							<TextField
								label={label}
								value={data}
								variant='standard'
								id='formatted-numberformat-input'
								onChange={(e) => {
									input(e.target.value === "" ? null : e.target.value);
								}}
								InputProps={{
									inputComponent: NumericFormatCustom,
								}}
								name='number-only-input'
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										next();
									}
								}}
							/>
						</Box>
					</div>
				</div>
				<div className='layout-button-area'>
					<LayoutButton buttonInfo={buttonInfo} data={data} next={next} />
				</div>
			</div>
		</>
	);
}

export default NumericInputLayout;
