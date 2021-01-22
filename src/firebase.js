
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase'
const firebaseConfig = {
    
  };

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBR6TmNlwDbJ__-zyyrIZ2yq6VpEJVTGSw",
    authDomain: "instagram-clone-d3a71.firebaseapp.com",
    projectId: "instagram-clone-d3a71",
    storageBucket: "instagram-clone-d3a71.appspot.com",
    messagingSenderId: "575936601829",
    appId: "1:575936601829:web:9b965e630805d3007efe0c",
    measurementId: "G-YB9YY8SBLW"


  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export {db, auth, storage};
