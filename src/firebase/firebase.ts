import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCbyakYCd97KrJghUYSfi83nBytfnP2oYw",
  authDomain: "jemmastables-3255c.firebaseapp.com",
  projectId: "jemmastables-3255c",
  storageBucket: "jemmastables-3255c.appspot.com",
  messagingSenderId: "709437780906",
  appId: "1:709437780906:web:9dd794c7f691ae77ee71d3",
  measurementId: "G-X0Q6J2HN9R",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

export default firebase;
