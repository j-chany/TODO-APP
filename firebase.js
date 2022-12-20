import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgiL7FMSbLlgVtLG68Jnqv7DesBfI-Z9M",
  authDomain: "todo-47e7e.firebaseapp.com",
  projectId: "todo-47e7e",
  storageBucket: "todo-47e7e.appspot.com",
  messagingSenderId: "957017819814",
  appId: "1:957017819814:web:51e152693c690614d5c267",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
