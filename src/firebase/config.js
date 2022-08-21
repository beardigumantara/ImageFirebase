// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "my-portofolio-88ac9.firebaseapp.com",
  projectId: "my-portofolio-88ac9",
  storageBucket: "my-portofolio-88ac9.appspot.com",
  messagingSenderId: "537591885376",
  appId: "1:537591885376:web:a11b1641d48b68e896f9a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);