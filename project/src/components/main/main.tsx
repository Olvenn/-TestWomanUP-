import { useState } from 'react';
import { AddTodoModal } from '../add-todo-modal/add-todo-modal';
import dayjs from 'dayjs';

type Props = {
  onSave: () => void;
}

export function Main({ onSave }: Props): JSX.Element {
  /**
   * The state for determining whether the modal window for adding a new one is open or closed todo
   * @type {[Boolean, Function]} Loading
   */
  const [showNewTodoModal, setShowNewTodoModal] = useState(false);

  /**
   * Default value of todo
   * @type {{
   * id: string, 
   * title: string, 
   * description: string, 
   * isComplete: boolean, 
   * finishedAt: string }}
   */

  const todo = {
    id: '',
    title: '',
    description: '',
    isComplete: false,
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
