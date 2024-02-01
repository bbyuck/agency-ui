import axios from "axios";
import { getTokenFromSession, getCredentialToken } from "util";
import { Authorization, X_Credential_Token } from "customHeader";

const file = axios.create({
	baseURL: process.env.REACT_APP_HOST,
	headers: {
		"Content-Type": "multipart/form-data",
		Accept: "application/json",
	},
});

file.interceptors.request.use(
	(config) => {
		config.headers[Authorization] = getTokenFromSession();
		config.headers[X_Credential_Token] = getCredentialToken();
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

const uploadPhoto = async (selectedFiles) => {
	// forData 생성
	const formData = new FormData();

	//request로 보내야할 데이터를 formData에 넣어서 보냈다.
	for (let i = 0; i < selectedFiles.length; i++) {
		formData.append("file", selectedFiles[i]);
	}

	return file.post("/v1/photo", formData);
};

export { uploadPhoto };
export default file;
