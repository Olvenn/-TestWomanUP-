import React from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { DocumentData, getFirestore, QuerySnapshot } from 'firebase/firestore';
import { config } from './config/config';
import { AddForm } from './components/add-form/add-form';
import { TodoesList } from './components/todoes-list/todoes-list';
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { TodoForm } from './components/temp/temp';
import { db } from './index';
import 'firebase/firestore';
import { Todo } from './types/types';

type AppProps = {
  todoes: Todo[];
}

function App({ todoes }: AppProps): JSX.Element {
  return (
    <div>
      <p>
        Hello, world!
      </p>
      <button
        // onClick={handleClearForm}
        className="btn btn--secondary">
        Add new TODO
      </button>
      <AddForm />
      <TodoesList todoes={todoes} />
      <TodoForm />
    </div>);
}

export default App;
