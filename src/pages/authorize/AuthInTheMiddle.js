import { useSearchParams } from "react-router-dom";

function AuthInTheMiddle() {
	const [searchParams] = useSearchParams();
	const authorizationCode = searchParams.get("code");
	const error = searchParams.get("error");

	return <></>;
}

export default AuthInTheMiddle;
