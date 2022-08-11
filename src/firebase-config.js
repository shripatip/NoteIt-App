import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
} from 'firebase/firestore';
import {
    getAuth,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC-_XZ49lYASzrhQkR_ACFSxhy_w179Jns",
    authDomain: "noteit-app-d3814.firebaseapp.com",
    projectId: "noteit-app-d3814",
    storageBucket: "noteit-app-d3814.appspot.com",
    messagingSenderId: "575487346420",
    appId: "1:575487346420:web:2db0c1aface626e5c540a1"
};

initializeApp(firebaseConfig);

//init service
 export const db = getFirestore();
 
const auth=getAuth();
//collection rel
export const notesCollectionRef = collection(db, 'notes');

//get collection data

