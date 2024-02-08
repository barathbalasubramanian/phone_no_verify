
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKAvmLRMPrZje5FjC-Qu0VOMieK3j_Cos",
  authDomain: "crud-application-86a21.firebaseapp.com",
  projectId: "crud-application-86a21",
  storageBucket: "crud-application-86a21.appspot.com",
  messagingSenderId: "282863878937",
  appId: "1:282863878937:web:79119a9e81d4a8866bbb88",
  measurementId: "G-RV6KDKBF2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);