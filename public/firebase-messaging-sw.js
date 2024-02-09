// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js",
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
	apiKey: process.env.REACT_APP_FCM_API_KEY,
	authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FCM_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FCM_APP_ID,
	measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload,
	);

	const { title, body } = payload.notification;

	// Customize notification here
	const notificationTitle = title;
	const notificationOptions = {
		body: body,
		icon: "/favicon.ico",
	};

	self.registration.showNotification(title, notificationOptions);
});
