import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#7795ff",
			contrastText: "#fff",
		},
		text: {
			main: "#505050",
			disabled: "#d1d1d1",
		},
	},
	typography: {
		fontFamily: ["Roboto", "Noto Sans KR", "sans-serif"].join(","),
		fontSize: 20,
	},
});

export default theme;
