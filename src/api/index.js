import axios from "axios";

import { getTokenFromSession } from "util";
import { Authorization, X_Credential_Token } from "customHeader";
import { getCredentialToken } from "util";
const api = axios.create({
	baseURL: process.env.REACT_APP_HOST,
	headers: {
		"Content-Type": "application/json;charset=UTF-8",
		Accept: "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		config.headers[Authorization] = getTokenFromSession();
		config.headers[X_Credential_Token] = getCredentialToken();
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

export default api;
