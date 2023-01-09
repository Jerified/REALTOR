// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH2GHFme_Dne4no568E1kNfWb7dqkjzfQ",
  authDomain: "realtor-clone-react-b3442.firebaseapp.com",
  projectId: "realtor-clone-react-b3442",
  storageBucket: "realtor-clone-react-b3442.appspot.com",
  messagingSenderId: "657933283164",
  appId: "1:657933283164:web:b196a0455396e2d0d85b99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore()