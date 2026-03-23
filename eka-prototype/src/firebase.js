import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMjxv7p6rHKeuhns0TovxOAjan083PQ8w",
  authDomain: "eka-platform.firebaseapp.com",
  projectId: "eka-platform",
  storageBucket: "eka-platform.firebasestorage.app",
  messagingSenderId: "172771004865",
  appId: "1:172771004865:web:ca428339fbe74e0098df40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
