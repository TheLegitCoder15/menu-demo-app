// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbi5ofiEwHW4PdbAFMKzWbNYOvoN4edh4",
  authDomain: "menu-demo-app-73327.firebaseapp.com",
  databaseURL:
    "https://menu-demo-app-73327-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "menu-demo-app-73327",
  storageBucket: "menu-demo-app-73327.appspot.com",
  messagingSenderId: "256895095082",
  appId: "1:256895095082:web:61cf934f5c355e4cbb8e53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export default db;
