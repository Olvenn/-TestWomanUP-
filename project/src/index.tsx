import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { config } from './config/config';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";
import { Todo } from './types/types';

const app = initializeApp(config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

const handleGetdata = async () => {
  const db = getFirestore(app);
  const getData = await getDocs(collection(db, "todoes"));
  const data: Todo[] = [];

  getData.forEach((doc) => {
    const item = {
      'id': doc.id,
      'title': doc.data().title,
      'description': doc.data().description,
      'checked': doc.data().checked,
      'finishedAt': doc.data().finishedAt,
    };
    data.push(item);
  });

  return data;
};

export const ddd = handleGetdata();
export const todoes: Todo[] = [];

ddd.then((result) => result.forEach((it) => todoes.push(it)));

// console.log('doc.id', todoes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App todoes={todoes} />
  </React.StrictMode>
);

reportWebVitals();
