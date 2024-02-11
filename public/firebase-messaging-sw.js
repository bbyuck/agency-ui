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
	apiKey: "AIzaSyA0HsncamJrwfAJr45faI8t2siKesITUpk",
	authDomain: "dating-agency-ab5a0.firebaseapp.com",
	projectId: "dating-agency-ab5a0",
	storageBucket: "dating-agency-ab5a0.appspot.com",
	messagingSenderId: "191218134860",
	appId: "1:191218134860:web:ae537a12b7bbabde01e9e9",
	measurementId: "G-32V0472N5L",
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
