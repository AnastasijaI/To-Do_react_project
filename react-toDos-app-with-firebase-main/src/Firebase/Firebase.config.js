// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWbMDn8pxTNa47Av2IOIaIO9NHcVCe33A",
  authDomain: "to-dolist-bcca1.firebaseapp.com",
  projectId: "to-dolist-bcca1",
  storageBucket: "to-dolist-bcca1.firebasestorage.app",
  messagingSenderId: "27812424793",
  appId: "1:27812424793:web:16bdd399a651adf78b5548",
  measurementId: "G-16489ENWSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db };