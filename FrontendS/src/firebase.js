import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// NEW IMPORTS
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7u5XXJr1k4n2GMseEWlu7ynVjUrV8Jrk",
  authDomain: "notify-379bc.firebaseapp.com",
  projectId: "notify-379bc",
  storageBucket: "notify-379bc.firebasestorage.app",
  messagingSenderId: "97171060546",
  appId: "1:97171060546:web:c852d7414d5bf96842badb",
  measurementId: "G-83XLLFL5DL"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

// NEW
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();