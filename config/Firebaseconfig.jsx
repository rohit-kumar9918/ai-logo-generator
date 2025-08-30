// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_JS_FIREBASE_API_KEY,
  authDomain: "ai-logo-generator-bc840.firebaseapp.com",
  projectId: "ai-logo-generator-bc840",
  storageBucket: "ai-logo-generator-bc840.firebasestorage.app",
  messagingSenderId: "700829319307",
  appId: "1:700829319307:web:e1e6c76d4647ac3820548e",
  measurementId: "G-16R2MPT1H1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);