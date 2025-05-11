// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKKviNnctUVJFZoCJTsN1dhk7IlvS8qtY",
  authDomain: "dsstorage-27d5d.firebaseapp.com",
  projectId: "dsstorage-27d5d",
  storageBucket: "dsstorage-27d5d.firebasestorage.app",
  messagingSenderId: "241836182349",
  appId: "1:241836182349:web:8665af4a354f22c90b8504"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'storage');
const storage = getStorage(app)

export {storage}