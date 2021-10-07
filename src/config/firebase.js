import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/database";


export const firebaseConfig = {
    apiKey: "AIzaSyDT1x9_z6ZZV4DV5nDKRlD8BwGv0nDX9Z8",
    authDomain: "smart-teh.firebaseapp.com",
    projectId: "smart-teh",
    storageBucket: "smart-teh.appspot.com",
    messagingSenderId: "477487556821",
    appId: "1:477487556821:web:5b39161e270e2296edda5c"
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

export const auth = getAuth(app);


  