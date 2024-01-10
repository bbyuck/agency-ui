import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authenticate } from "store/slice/auth";
import http from "api";
import { saveAuthInfoOnClient } from "util";

function Auth() {
	const [searchParams] = useSearchParams();
	const authorizationCode = searchParams.get("code");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (authorizationCode) {
			http
				.post("/v1/kakao/login", {
					code: authorizationCode,
				})
				.then((response) => {
					console.log("login success");
					dispatch(authenticate(response.data.data));
					saveAuthInfoOnClient(response.data.data);
				})
				.catch(() => {
					console.log("auth failed");
				});

			/**
			 * application store에 유저 정보 저장
			 */
			// dispatch(
			// 	authenticate({
			// 		authToken: authToken,
			// 	}),
			// );
		}
	}, []);

	return <></>;
}

export default Auth;
