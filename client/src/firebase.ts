// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kagaz-96bd1.firebaseapp.com",
  projectId: "kagaz-96bd1",
  storageBucket: "kagaz-96bd1.appspot.com",
  messagingSenderId: "667952099478",
  appId: "1:667952099478:web:163c8384d27a53e38652b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);