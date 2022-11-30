import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import './App.css';
import { TodoesList } from './components/todoes-list/todoes-list';
import { Main } from './components/main/main';
import { Todo } from './types/types';
import { db } from './db/index';

function App(): JSX.Element {
  const [todoes, setTodoes] = useState<Todo[]>([]);
  const getData = async () => {
    const getDataFormFirebase = await getDocs(collection(db, "todoes"));
    const data: Todo[] = [];

    getDataFormFirebase.forEach((doc) => {
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

  const loadTodos = () => {
    const todoesPromise = getData();
    todoesPromise.then((result: Todo[]) => {
      setTodoes(result);
    })
  }

  useEffect(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>
        Hello, world!
      </p>
      <Main onSave={loadTodos} />
      <TodoesList todoes={todoes} onSave={loadTodos} />
    </div>);
}

export default App;
