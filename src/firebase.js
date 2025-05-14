import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjnmdZn-rf_Gzb6694I9q_cfaZKSLVjMo",
  authDomain: "smart-inverter-system.firebaseapp.com",
  projectId: "smart-inverter-system",
  storageBucket: "smart-inverter-system.firebasestorage.app",
  messagingSenderId: "168152034601",
  appId: "1:168152034601:web:376fc2c406be32ba6c9b38",
  measurementId: "G-G6TW1R7T0H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
