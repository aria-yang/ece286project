// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC0yJhNk7Din5cAyne0WR03JDJwbfSVjfY",
  authDomain: "ece286project.firebaseapp.com",
  projectId: "ece286project",
  storageBucket: "ece286project.firebasestorage.app",
  messagingSenderId: "463035059870",
  appId: "1:463035059870:web:7cf754d87f6baf1ccab58f",
  measurementId: "G-TD08VSXH54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
