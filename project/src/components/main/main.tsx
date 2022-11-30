import { useState } from 'react';
import { AddTodoModal } from '../add-todo-modal/add-todo-modal';
import dayjs from 'dayjs';

type Props = {
  onSave: () => void;
}

export function Main({ onSave }: Props): JSX.Element {
  const [showNewTodoModal, setShowNewTodoModal] = useState(false);

  const todo = {
    id: '',
    title: '',
    description: '',
    checked: false,
    finishedAt: dayjs(new Date()).format(),
  }

  const handleAddTodo = () => {
    setShowNewTodoModal(true);
  };

  const handleCloseTodo = () => {
    setShowNewTodoModal(false);
  };

  return (
    <div className='main-container'>
      {showNewTodoModal && (
        <AddTodoModal onClose={handleCloseTodo} onSave={onSave} todo={todo} />
      )}
      <button
        onClick={handleAddTodo}
        className="btn__new">
        Add new TODO
      </button>
    </div>);
}
