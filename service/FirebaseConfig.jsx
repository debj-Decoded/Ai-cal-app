// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import { Platform } from "react-native";
import { getAuth, initializeAuth,getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
 
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-cal-app-10aee.firebaseapp.com",
    projectId: "ai-cal-app-10aee",
    storageBucket: "ai-cal-app-10aee.firebasestorage.app",
    messagingSenderId: "86406575065",
    appId: "1:86406575065:web:c7b633817c1bb1853ddfc8",
    measurementId: "G-ZYT1NV82E7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=Platform.OS=='web'?getAuth(app):initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})