// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsaebstOFNCkLbN0Tc5lBFGOYAYv20q5Y",
  authDomain: "fir-auth-7a8e4.firebaseapp.com",
  projectId: "fir-auth-7a8e4",
  storageBucket: "fir-auth-7a8e4.appspot.com",
  messagingSenderId: "663050243293",
  appId: "1:663050243293:web:e91dbf931f261421ce1f34",
  measurementId: "G-LL5S3H421M"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);

export default {auth, firestore};
