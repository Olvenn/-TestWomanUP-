import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { config } from '../config/config';

const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);