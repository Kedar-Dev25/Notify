// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7u5XXJr1k4n2GMseEWlu7ynVjUrV8Jrk",
  authDomain: "notify-379bc.firebaseapp.com",
  projectId: "notify-379bc",
  storageBucket: "notify-379bc.firebasestorage.app",
  messagingSenderId: "97171060546",
  appId: "1:97171060546:web:c852d7414d5bf96842badb",
  measurementId: "G-83XLLFL5DL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);