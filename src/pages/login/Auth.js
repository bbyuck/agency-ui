import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authenticate } from "store/slice/auth";
import http from "api";
import { saveAuthInfoOnClient } from "util";
import { forceHome } from "util";

function Auth() {
	const [searchParams] = useSearchParams();
	const authorizationCode = searchParams.get("code");
	const error = searchParams.get("error");

	const dispatch = useDispatch();

	useEffect(() => {
		if (authorizationCode) {
			http
				.post("/v1/kakao/login", {
					code: authorizationCode,
				})
				.then((response) => {
					dispatch(authenticate(response.data.data));
					forceHome();
				})
				.catch(() => {
					forceHome();
				});

			/**
			 * application store에 유저 정보 저장
			 */
			// dispatch(
			// 	authenticate({
			// 		authToken: authToken,
			// 	}),
			// );
		} else if (error) {
			forceHome();
		}
	}, []);

	return <></>;
}

export default Auth;
