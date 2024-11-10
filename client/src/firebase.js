// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-estate-d8c74.firebaseapp.com",
  projectId: "mern-estate-d8c74",
  storageBucket: "mern-estate-d8c74.firebasestorage.app",
  messagingSenderId: "383621180554",
  appId: "1:383621180554:web:3e0b6a7a4888a30e999173"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);