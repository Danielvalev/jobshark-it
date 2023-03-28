// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBegPSJP0dal5Ch3rSBLBScE2V_j5fH0lo",
  authDomain: "jobshark-it.firebaseapp.com",
  projectId: "jobshark-it",
  storageBucket: "jobshark-it.appspot.com",
  messagingSenderId: "547017189627",
  appId: "1:547017189627:web:9fb2fe7e2cca5458fca85e",
  measurementId: "G-CSJC74MDMW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);
export const analytics = getAnalytics(app);
