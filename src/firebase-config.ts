import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdYw45Gtv9lne43b39qotorhB8fmL597M",
  authDomain: "ideasdashboard-9b951.firebaseapp.com",
  projectId: "ideasdashboard-9b951",
  storageBucket: "ideasdashboard-9b951.appspot.com",
  messagingSenderId: "487406122218",
  appId: "1:487406122218:web:a97e47030a4be308ce9393",
  measurementId: "G-1P22KBGD3Q"
};
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth:Auth = getAuth(app);

  export const db = getFirestore(app);
  export const storage = getStorage(app);