// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIJu6j_NO1DlKkYRtfZlyEqFpmCP0XUpI",
  authDomain: "impulse-oa-task-manager.firebaseapp.com",
  projectId: "impulse-oa-task-manager",
  storageBucket: "impulse-oa-task-manager.appspot.com",
  messagingSenderId: "685242133133",
  appId: "1:685242133133:web:1dc4fb5525f3629a24d0c4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

// // Supposed to be the recommended way to persist memory. Comment out for now. 
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });