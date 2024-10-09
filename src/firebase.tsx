// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process.env.REACT_APP_API_KEY_EXT;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN_EXT;
const projectId = process.env.REACT_APP_PROJECT_ID_EXT;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET_EXT;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID_EXT;
const appId = process.env.REACT_APP_APP_ID_EXT;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
