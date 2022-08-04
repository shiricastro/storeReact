

import firebase from 'firebase/app';
import 'firebase/firebase-firestore'


const firebaseConfig = {
  apiKey: "AIzaSyABqVCPoqIt0knB0bQzWnU1Rk1P7YreH1A",
  authDomain: "store-5928d.firebaseapp.com",
  projectId: "store-5928d",
  storageBucket: "store-5928d.appspot.com",
  messagingSenderId: "959688275599",
  appId: "1:959688275599:web:82749def24b33ad518a2fa"
};
firebase.initializeApp(firebaseConfig);

export default firebase;