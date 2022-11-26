import { useState } from 'react';
import { AddTodoModal } from '../add-todo-modal/add-todo-modal';

type Props = {
  onSave: () => void;
}

export function Main({ onSave }: Props): JSX.Element {
  const [showNewTodoModal, setShowNewTodoModal] = useState(false);

  const handleAddTodo = () => {
    setShowNewTodoModal(true);
  };

  const handleCloseTodo = () => {
    setShowNewTodoModal(false);
  };

  return (
    <div className='main-container'>
      {showNewTodoModal && (
        <AddTodoModal onClose={handleCloseTodo} onSave={onSave} />
      )}
      <button
        onClick={handleAddTodo}
        className="btn btn--secondary">
        Add new TODO
      </button>
    </div>);
}
