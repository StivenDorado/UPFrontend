
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmtKoBOCsoYUTG12LZr069ZhIRVbClc94",
  authDomain: "arrendamientos-80c2a.firebaseapp.com",
  projectId: "arrendamientos-80c2a",
  storageBucket: "arrendamientos-80c2a.firebasestorage.app",
  messagingSenderId: "32381451979",
  appId: "1:32381451979:web:923a8e40929f827758e54e",
  measurementId: "G-KH906XKVKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };