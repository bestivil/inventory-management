// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
