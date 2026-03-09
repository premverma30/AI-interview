import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "evalai-1d2ac.firebaseapp.com",
  projectId: "evalai-1d2ac",
  storageBucket: "evalai-1d2ac.firebasestorage.app",
  messagingSenderId: "824005891200",
  appId: "1:824005891200:web:0b3e7a3827a79431210265"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}