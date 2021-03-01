import firebase from 'firebase'



// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB0ZbT7bMuRDScTKF1j1TPA61NuUNcVMsI",
    authDomain: "alex-berg-07.firebaseapp.com",
    projectId: "alex-berg-07",
    storageBucket: "alex-berg-07.appspot.com",
    messagingSenderId: "248383062843",
    appId: "1:248383062843:web:03438a270b9610d0df6d1e"
  };
  // Initialize Firebase

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const functions = firebase.functions()
  const storage = firebase.storage()
  
  export { db , auth, functions, storage }