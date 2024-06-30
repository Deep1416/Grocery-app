
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCx7GLPM9r5Zmaw_CNh1Dyt69z6atmnwF4",
    authDomain: "grocery-a12c6.firebaseapp.com",
    projectId: "grocery-a12c6",
    storageBucket: "grocery-a12c6.appspot.com",
    messagingSenderId: "526308542516",
    appId: "1:526308542516:web:d123f9d16f4e3fe4632261"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };