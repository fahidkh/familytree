import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import { createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvJ5XDfN_X8byIA2tZ4YcKCP3pmatGpGg",
  authDomain: "familytree-a2fab.firebaseapp.com",
  projectId: "familytree-a2fab",
  storageBucket: "familytree-a2fab.appspot.com",
  messagingSenderId: "122621398504",
  appId: "1:122621398504:web:3e69784a3ec96bdf51285d",
  measurementId: "G-T0DBKWPZDP"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export function signup(email, password){
  return createUserWithEmailAndPassword(auth, email, password);
}
export { auth, provider};
export default db;