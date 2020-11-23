import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBbgjqDWYxgeZDgMvtvcADSzpvQGKsNX5E",
  authDomain: "image-editing-platform.firebaseapp.com",
  databaseURL: "https://image-editing-platform.firebaseio.com",
  projectId: "image-editing-platform",
  storageBucket: "image-editing-platform.appspot.com",
  messagingSenderId: "570618635572",
  appId: "1:570618635572:web:f1cdf8202f8499e5e9f161",
  measurementId: "G-TJGTDTQ93E",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
