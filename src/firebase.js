import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDeP9cSfZ2qHeog3P_AKlTQpuka3nKKosU",
    authDomain: "challenge-clone.firebaseapp.com",
    databaseURL: "https://challenge-clone.firebaseio.com",
    projectId: "challenge-clone",
    storageBucket: "challenge-clone.appspot.com",
    messagingSenderId: "497455004925",
    appId: "1:497455004925:web:790c2e8372809184131294",
    measurementId: "G-JL2BYZ936D"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
