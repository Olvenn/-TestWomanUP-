import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import './App.css';
import { TodosList } from './components/todos-list/todos-list';
import { Main } from './components/main/main';
import { Todo } from './types/types';
import { db } from './db/index';

function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const getData = async () => {
    const getDataFormFirebase = await getDocs(collection(db, "todoes"));
    const data: Todo[] = [];

    getDataFormFirebase.forEach((doc) => {
      const item = {
        'id': doc.id,
        'title': doc.data().title,
        'description': doc.data().description,
        'isComplete': doc.data().isComplete,
        'finishedAt': doc.data().finishedAt,
      };
      data.push(item);
    });

    return data;
  };

  const loadTodos = () => {
    const todosPromise = getData();
    todosPromise.then((result: Todo[]) => {
      setTodos(result);
    })
  }

  useEffect(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Main onSave={loadTodos} />
      <TodosList todos={todos} onSave={loadTodos} />
    </div>);
}

export default App;
