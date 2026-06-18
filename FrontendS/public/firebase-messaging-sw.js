importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD7u5XXJr1k4n2GMseEWlu7ynVjUrV8Jrk",
  authDomain: "notify-379bc.firebaseapp.com",
  projectId: "notify-379bc",
  storageBucket: "notify-379bc.firebasestorage.app",
  messagingSenderId: "97171060546",
  appId: "1:97171060546:web:c852d7414d5bf96842badb"
});

const messaging = firebase.messaging();