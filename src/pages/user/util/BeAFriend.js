import http from "api";
import { ACTIVE } from "constants/memberStatus";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const inappDeny = () => {
	var inappdeny_exec_vanillajs = (callback) => {
		if (document.readyState !== "loading") {
			callback();
		} else {
			document.addEventListener("DOMContentLoaded", callback);
		}
	};
	inappdeny_exec_vanillajs(() => {
		/* Do things after DOM has fully loaded */
		function copytoclipboard(val) {
			var t = document.createElement("textarea");
			document.body.appendChild(t);
			t.value = val;
			t.select();
			document.execCommand("copy");
			document.body.removeChild(t);
		}
		function inappbrowserout() {
			copytoclipboard(window.location.href);
			alert(
				'URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.',
			);
			window.location.href = "x-web-search://?";
		}

		var useragt = navigator.userAgent.toLowerCase();
		var target_url = window.location.href;

		if (useragt.indexOf("kakaotalk") !== -1) {
			if (useragt.indexOf("iphone") !== -1) {
				//모바일대응뷰포트강제설정
				var mobile = document.createElement("meta");
				mobile.name = "viewport";
				mobile.content =
					"width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui";
				document.getElementsByTagName("head")[0].appendChild(mobile);
				//노토산스폰트강제설정
				var fonts = document.createElement("link");
				fonts.href =
					"https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap";
				document.getElementsByTagName("head")[0].appendChild(fonts);
				document.body.innerHTML =
					"<style>body{margin:0;padding:0;font-family: 'Noto Sans KR', sans-serif;overflow: hidden;height: 100%;}</style><h2 style='padding-top:50px; text-align:center;font-family: 'Noto Sans KR', sans-serif;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2><article style='text-align:center; font-size:17px; word-break:keep-all;color:#999;'>아래 버튼을 눌러 Safari를 실행해주세요<br />Safari가 열리면, 주소창을 길게 터치한 뒤,<br />'붙여놓기 및 이동'을 누르면<br />정상적으로 이용할 수 있습니다.<br /><br /><button onclick='inappbrowserout();' style='min-width:180px;margin-top:10px;height:54px;font-weight: 700;background-color:#31408E;color:#fff;border-radius: 4px;font-size:17px;border:0;'>Safari로 열기</button></article><img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />";
			} else {
				//안드로이드는 Chrome이 설치되어있음으로 강제로 스킴실행한다.
				window.location.href =
					"intent://" +
					target_url.replace(/https?:\/\//i, "") +
					"#Intent;scheme=http;package=com.android.chrome;end";
			}
		}
	});
};

function BeAFriend() {
	const { userStatus } = useSelector((state) => state.userInfo);
	const [searchParams] = useSearchParams();
	const matchmakerCode = searchParams.get("matchmaker");
	const navigate = useNavigate();

	useEffect(() => {
		inappDeny();
		if (!matchmakerCode) {
			navigate("/user/home");
		}
		if (userStatus !== ACTIVE) {
			navigate("/error");
		}
	}, [matchmakerCode, navigate, userStatus]);

	return <></>;
}

export default BeAFriend;
