import { TodoItem } from '../todo-item/todo-item';
import { useEffect, useState } from 'react';
import { Todo } from '../..//types/types';

type TodoesListProps = {
  todoes: Todo[];
  onSave: () => void;
}

console.log('dsdsfdаss');

export function TodoesList({ todoes, onSave }: TodoesListProps): JSX.Element {
  useEffect(() => {
    setTodoes(todoes);
    onSave();
  }, [todoes, onSave]);

  const [data, setTodoes] = useState(todoes);
  return (
    <>
      <div className="todoes">
        {data.length ?
          data.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))
          : <div>Start</div>}
      </div>
    </>
  );
}
