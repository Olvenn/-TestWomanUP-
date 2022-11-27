import { ListItem } from '../list-item/list-item';
import { useEffect, useState } from 'react';
import { Todo } from '../..//types/types';
import { sortByDay } from '../../utils';

type TodoesListProps = {
  todoes: Todo[];
  onSave: () => void;
}

console.log('dsdsfdаss');

export function TodoesList({ todoes, onSave }: TodoesListProps): JSX.Element {
  useEffect(() => {
    setTodoes(todoes);
  }, [todoes]);


  const sortedTodoes = todoes.sort((prev, next) => sortByDay(next.finishedAt, prev.finishedAt));
  sortedTodoes.sort((prev, next) => Number(prev.checked) - Number(next.checked));
  const [data, setTodoes] = useState(todoes);
  return (
    <>
      <div className="todoes">
        {data.length ?
          sortedTodoes.map((todo) => (
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
