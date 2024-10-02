// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
import * as core from '@actions/core';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = core.getInput('REACT_APP_API_KEY');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "pol-mebel-c69ce.firebaseapp.com",
  projectId: "pol-mebel-c69ce",
  storageBucket: "pol-mebel-c69ce.appspot.com",
  messagingSenderId: "548570055197",
  appId: "1:548570055197:web:be075af4cf6f19fe6abcf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
