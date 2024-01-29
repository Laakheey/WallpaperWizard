import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXwTQxkGSAbeV-IpWUcTxiDwAko9K9z5E",
  authDomain: "wallpaperwizard-190de.firebaseapp.com",
  projectId: "wallpaperwizard-190de",
  storageBucket: "wallpaperwizard-190de.appspot.com",
  messagingSenderId: "38430731875",
  appId: "1:38430731875:web:1b00d1e5b6b40fe2479256",
  measurementId: "G-3C4LY1CMYP"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


