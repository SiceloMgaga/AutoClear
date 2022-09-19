import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


export const environment = {
  production: false,
  apiURL: 'https://localhost:44329/api/',
  firebase: {
    apiKey: "AIzaSyBefrOdDSjwcSx3tnPHOTSAnH5mIVCk3ZQ",
    authDomain: "autoclear-313be.firebaseapp.com",
    projectId: "autoclear-313be",
    storageBucket: "autoclear-313be.appspot.com",
    messagingSenderId: "514112614894",
    appId: "1:514112614894:web:264411f9cc423f737c1eff",
    measurementId: "G-3JP6RP1QLM"
  }
};


// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);