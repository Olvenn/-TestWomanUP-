import { ListItem } from '../list-item/list-item';
import { useEffect, useState } from 'react';
import { Todo } from '../../types/types';
import { sortByDay } from '../../utils';

type TodosListProps = {
  todos: Todo[];
  onSave: () => void;
}

export function TodosList({ todos, onSave }: TodosListProps): JSX.Element {
  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  const sortedTodos = todos.sort((prev, next) => sortByDay(next.finishedAt, prev.finishedAt));
  sortedTodos.sort((prev, next) => Number(prev.isComplete) - Number(next.isComplete));
  const [data, setTodos] = useState(todos);
  return (
    <>
      <div className="todos">
        {data.length ?
          sortedTodos.map((todo) => (
            <ListItem
              key={todo.id}
              todo={todo}
              onSave={onSave}
            />
          ))
          : <div className="loading">Loading...</div>}
      </div>
    </>
  );
}
