import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage } from '@angular/fire/storage';
import { environment } from "@env";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(environment.firebase);
// other way too, export..
//const analytics = getAnalytics(app);


//const auth = getAuth();
// export const db = getFirestore(app);
const db = getFirestore(app); // firebase.firestore(); if do the other way
const storage = getStorage(app);// firebase.storage();

export { db, storage };