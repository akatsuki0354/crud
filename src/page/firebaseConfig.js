import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration details
  apiKey: "AIzaSyD09Z8Yz7HfFwW3k3fV4468cfJh6-hiwj0",
  authDomain: "frank-dev-03.firebaseapp.com",
  databaseURL: "https://frank-dev-03-default-rtdb.firebaseio.com",
  projectId: "frank-dev-03",
  storageBucket: "frank-dev-03.appspot.com",
  messagingSenderId: "932549352408",
  appId: "1:932549352408:web:b8dac01c420e19970b70ad",
  measurementId: "G-5KXM2K2731"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default auth;
