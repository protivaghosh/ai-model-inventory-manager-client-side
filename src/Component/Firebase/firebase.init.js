// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl4PigLbYof5K4FPokFSNKDpp2oy2NZnA",
  authDomain: "ai-model-inventory-86e63.firebaseapp.com",
  projectId: "ai-model-inventory-86e63",
  storageBucket: "ai-model-inventory-86e63.firebasestorage.app",
  messagingSenderId: "888219770483",
  appId: "1:888219770483:web:57c20a0ca57e199e799406"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;