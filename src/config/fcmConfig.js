import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

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

const analytics = getAnalytics(fcm);
const messaging = getMessaging();

export const requestPermission = () => {
	Notification.requestPermission().then((permission) => {
		if (permission === "granted") {
			getFcmToken();
		}
		return false;
	});
};

const getFcmToken = () => {
	return getToken(messaging, {
		vapidKey:
			"BIXM8eSCp7QjleRMEVI1MdzuwZvEGtl4ho2AOQAFoa_D8etzBnXX1lULwZQ7FmZTwWJcr-KS1f2eNMU0_BgnEtM",
	})
		.then((currentToken) => {
			if (currentToken) {
				// Send the token to your server and update the UI if necessary
				// ...
				console.log(currentToken);
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
