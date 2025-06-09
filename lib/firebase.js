// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCxAieSpxdtzyRRuesH7zWcSraaTwHjVlI",
  authDomain: "web-developer-3d7db.firebaseapp.com",
  databaseURL: "https://web-developer-3d7db-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "web-developer-3d7db",
  storageBucket: "web-developer-3d7db.appspot.com",
  messagingSenderId: "675554122600",
  appId: "1:675554122600:web:cb79eb4cbf3d71088e54dd",
  measurementId: "G-8YDXS10SQ9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
