import axios from "axios";

import { getTokenFromSession } from "util";
import { Authorization } from "customHeader";
const api = axios.create({
	baseURL: process.env.REACT_APP_HOST,
});

api.interceptors.request.use(
	(config) => {
		config.headers[Authorization] = getTokenFromSession();
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

export default api;
