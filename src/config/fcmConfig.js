import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import http from "api";

// Initialize Firebase
export const firebaseConfig = {
	apiKey: process.env.REACT_APP_FCM_API_KEY,
	authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FCM_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FCM_APP_ID,
	measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
};

const fcm = initializeApp(firebaseConfig);
const messaging = getMessaging(fcm);

export const requestPermission = () => {
	Notification.requestPermission().then((permission) => {
		if (permission === "granted") {
			getFcmToken();
		}
	});
};

const getFcmToken = () => {
	return getToken(messaging, {
		vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
	})
		.then((currentToken) => {
			if (currentToken) {
				// Send the token to your server and update the UI if necessary
				// ...
				const memberCode = localStorage.getItem("memberCode");

				if (!memberCode) {
					alert("멤버코드가 없습니다.");
					return false;
				}

				if (memberCode === "USER") {
					http
						.post("/v1/user/fcm/token", {
							value: currentToken,
						})
						.then((response) => {
							localStorage.setItem("fcmToken", response.data.data.value);
						})
						.catch((error) => {
							console.log(error);
						});
				} else if (memberCode === "MATCH_MAKER") {
				}
			} else {
				// Show permission request UI
				console.log(
					"No registration token available. Request permission to generate one.",
				);
				// ...
			}
		})
		.catch((err) => {
			console.log("An error occurred while retrieving token. ", err);
			// ...
		});
};

/**
 * foreGround -> webSocket 처리
 */
// onMessage(messaging, (message) => {
// 	console.log(`foreground :: ${message}`);
// });
