// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACUIzdxt-MxlzZJWG-MCcuRIwGXiGx1EU",
  authDomain: "personal-website-ef637.firebaseapp.com",
  projectId: "personal-website-ef637",
  storageBucket: "personal-website-ef637.firebasestorage.app",
  messagingSenderId: "269861284343",
  appId: "1:269861284343:web:1598ca301cf9620fa6a6f2",
  measurementId: "G-W38KTHC2GE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


console.log("Firebase initialized successfully!");

