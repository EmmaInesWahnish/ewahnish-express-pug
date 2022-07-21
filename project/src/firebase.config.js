// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7LLNIzcThaCg56aqkCJFjTXv5U46Xiss",
  authDomain: "ewahnish-backend-project.firebaseapp.com",
  projectId: "ewahnish-backend-project",
  storageBucket: "ewahnish-backend-project.appspot.com",
  messagingSenderId: "548372587591",
  appId: "1:548372587591:web:4706695081122cfdc1fd62"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default getFirestore();