import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_API_KEY } from "@env"

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "capnet-cd13c.firebaseapp.com",
  projectId: "capnet-cd13c",
  storageBucket: "capnet-cd13c.firebasestorage.app",
  messagingSenderId: "803270494121",
  appId: "1:803270494121:web:3c95eeeb4759682b7c66b8",
  measurementId: "G-S6GMZVBJ7Z",
  databaseURL: "https://capnet-cd13c.firebaseio.com"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);

console.log("App inicializado:", app.name);

export { db };