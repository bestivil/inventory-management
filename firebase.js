// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIYIE-U7kyt0dAsIQkN39MX3xY87KOdqY",
  authDomain: "inventory-mangement-sys.firebaseapp.com",
  projectId: "inventory-mangement-sys",
  storageBucket: "inventory-mangement-sys.appspot.com",
  messagingSenderId: "719892127726",
  appId: "1:719892127726:web:3870720243a959a430f8ff",
  measurementId: "G-53YH3N2Z4F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };