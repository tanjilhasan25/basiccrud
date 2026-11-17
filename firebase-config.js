// Import Firebase core and Firestore database tools from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

// Your new Firebase project configuration credentials
const cfg = {
  apiKey: "AIzaSyC9PdMaeRC6Q4NrDCVOg4zDuvqPX0x1TRM",
  authDomain: "basiccrud-b3589.firebaseapp.com",
  projectId: "basiccrud-b3589",
  storageBucket: "basiccrud-b3589.firebasestorage.app",
  messagingSenderId: "169175051771",
  appId: "1:169175051771:web:0c235a138b6c6e03cbaf5e"
};

// Initialize Firebase app and export the database instance
const app = initializeApp(cfg);
export const db = getFirestore(app);