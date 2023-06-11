import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration details
   apiKey: "AIzaSyDcBP3v9NIg9YyNZbWnuKNcUHUpeYRKBoY",
   authDomain: "iconectstudent.firebaseapp.com",
   databaseURL: "https://iconectstudent-default-rtdb.firebaseio.com",
   projectId: "iconectstudent",
   storageBucket: "iconectstudent.appspot.com",
   messagingSenderId: "592757466358",
   appId: "1:592757466358:web:5fc730b9812d1b6aceb8d7",
   measurementId: "G-WW7M44ENGJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default auth;
