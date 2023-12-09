// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAg4rXprNbWTpWDyDL3PNI3rNWuXispsyE",
    authDomain: "optikaluani-d2e5b.firebaseapp.com",
    // databaseURL: "https://optikaluani-d2e5b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "optikaluani-d2e5b",
    storageBucket: "optikaluani-d2e5b.appspot.com",
    messagingSenderId: "921054550871",
    appId: "1:921054550871:web:d15ad3dc15b765933afc12",
    measurementId: "G-82X12J4EQ5"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;


