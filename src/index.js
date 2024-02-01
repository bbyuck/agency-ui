import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./style/theme";

/*
 * store
 */
import { Provider } from "react-redux";
import store from "store";
import { scrollDisable, setScreenSize } from "util";

setScreenSize();
scrollDisable();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</BrowserRouter>,
	// </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
