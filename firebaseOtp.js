import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsaebstOFNCkLbN0Tc5lBFGOYAYv20q5Y",
  authDomain: "fir-auth-7a8e4.firebaseapp.com",
  projectId: "fir-auth-7a8e4",
  storageBucket: "fir-auth-7a8e4.appspot.com",
  messagingSenderId: "663050243293",
  appId: "1:663050243293:web:e91dbf931f261421ce1f34",
  measurementId: "G-LL5S3H421M"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;