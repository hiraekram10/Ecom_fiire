// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCcQtjalUDViTUEpCyGiSkA9jPuLoeRIVk",
  authDomain: "hellofir-50af4.firebaseapp.com",
  projectId: "hellofir-50af4",
  storageBucket: "hellofir-50af4.appspot.com",
  messagingSenderId: "426776427524",
  appId: "1:426776427524:web:d802979e1f661037a00951"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

//>>>>>>>>>>>>addition
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db= getFirestore(app);
