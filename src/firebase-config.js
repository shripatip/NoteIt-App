import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
} from 'firebase/firestore'

import {
getAuth,
} from 'firebase/auth'; 

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "noteit-app-d3814.firebaseapp.com",
    projectId: "noteit-app-d3814",
    storageBucket: "noteit-app-d3814.appspot.com",
    messagingSenderId: "575487346420",
    appId: "1:575487346420:web:2db0c1aface626e5c540a1"
};

initializeApp(firebaseConfig);

//init service
export const db = getFirestore();
 export const Auth = getAuth();
//collection rel
export const notesCollectionRef = collection(db, 'notes');
export const usersCollectionRef=collection(db,'users');



//get collection data

