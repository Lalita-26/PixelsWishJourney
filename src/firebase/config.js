import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBduEYuhGEuJYtByeK6RdRgcQxUUfLyAK0",
  authDomain: "pixels-on-stage.firebaseapp.com",
  projectId: "pixels-on-stage",
  storageBucket: "pixels-on-stage.firebasestorage.app",
  messagingSenderId: "872675954122",
  appId: "1:872675954122:web:4f64d09ee84d8cb4105333",
  measurementId: "G-P5YLLF8SSC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
