
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAHMe6NdlmxlsFEwj2msi0WM2WqccR1h_4",
  authDomain: "expense-tracker-d68da.firebaseapp.com",
  projectId: "expense-tracker-d68da",
  storageBucket: "expense-tracker-d68da.appspot.com",
  messagingSenderId: "252162554453",
  appId: "1:252162554453:web:6844995616615a38d7f2dc",
  measurementId: "G-T08S6JHDQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
const analytics = getAnalytics(app);