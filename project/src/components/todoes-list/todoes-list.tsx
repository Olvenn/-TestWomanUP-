import { ListItem } from '../list-item/list-item';
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
  }, [todoes]);

  const [data, setTodoes] = useState(todoes);
  return (
    <>
      <div className="todoes">
        {data.length ?
          data.map((todo) => (
            <ListItem
              key={todo.id}
              todo={todo}
              onSave={onSave}
            />
          ))
          : <div>Start</div>}
      </div>
    </>
  );
}
