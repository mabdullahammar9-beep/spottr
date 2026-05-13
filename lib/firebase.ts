import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBV74hBwK-EZFiaUbHpdf8MQaEQwnVlBrU",
  authDomain: "spottr-f650a.firebaseapp.com",
  projectId: "spottr-f650a",
  storageBucket: "spottr-f650a.firebasestorage.app",
  messagingSenderId: "577016129074",
  appId: "1:577016129074:web:4d0a5f2c0bd88a237dbe2b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);