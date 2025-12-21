import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

/**
 * Firebase configuration
 * Values are loaded from Vite environment variables
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 🔍 DEBUG: Check if env variables are loading
console.log("====== FIREBASE DEBUG ======");
console.log("API Key loaded:", firebaseConfig.apiKey);
console.log("API Key length:", firebaseConfig.apiKey?.length);
console.log("Project ID:", firebaseConfig.projectId);
console.log("Full config:", firebaseConfig);
console.log("===========================");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase connected:", firebaseConfig.projectId);

// Firebase Authentication
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local");
  })
  .catch((err) => {
    console.error("Persistence error", err);
  });

export const googleProvider = new GoogleAuthProvider();

export default app;
