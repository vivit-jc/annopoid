import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCvLCMvY69B7_Cpl0Uh-h4DsDRC27BVbYI',
  authDomain: 'annopoid.firebaseapp.com',
  projectId: 'annopoid',
  storageBucket: 'annopoid.appspot.com',
  messagingSenderId: '573303560032',
  appId: '1:573303560032:web:20ffb1298ebd3c28df7005',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
