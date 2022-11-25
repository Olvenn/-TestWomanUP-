import React from 'react';
import './App.css';
import { AddForm } from './components/add-form/add-form';
import { TodoesList } from './components/todoes-list/todoes-list';
import { TodoForm } from './components/temp/temp';
import 'firebase/firestore';
import { Todo } from './types/types';
import { Main } from './components/main/main';
import firebase from 'firebase';

type AppProps = {
  todoes: Todo[];
}

function App({ todoes }: AppProps): JSX.Element {
  return (
    <div>
      <p>
        Hello, world!
      </p>
      <Main />
      {/* <AddForm /> */}
      <TodoesList todoes={todoes} />
      <TodoForm />
    </div>);
}

export default App;
