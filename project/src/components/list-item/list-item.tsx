import { useState } from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { Todo } from '../../types/types';
import { db } from '../../db/index';
import { TodoItem } from '../todo-item/todo-item';
import { getTimeDifference, humanizeData } from '../../utils';

type TodoProps = {
  todo: Todo;
  onSave: () => void;
}

export function ListItem({ todo, onSave }: TodoProps): JSX.Element {
  const [showTodoModal, setShowTodoModal] = useState(false);

  const finishedAt = humanizeData(todo.finishedAt);
  const isOverdue = getTimeDifference(todo.finishedAt) < 0;

  const handleDeleteClick = async (id: string) => {
    await deleteDoc(doc(db, "todoes", id));
    onSave()
  };

  const handleAddTodoPreview = () => {
    setShowTodoModal(true);
  };

  const handleCloseTodo = () => {
    setShowTodoModal(false);
  };

  return (
    <>
      {/* {showTodoModal && (
        <TodoItem onClose={handleCloseTodo} onSave={onSave} />
      )} */}
      {showTodoModal && (
        <TodoItem onClose={handleCloseTodo} todo={todo} />
      )}
      <div
        onClick={handleAddTodoPreview}
        className={`${isOverdue ? 'container-item modal__content overdue' : 'container-item modal__content'}`}
        data-title="The todo is overdue.">
        <button
          onClick={() => handleDeleteClick(todo.id)}
          className="modal__close-btn button-cross"
          type="button"
          aria-label="Закрыть">
          <span className="button-cross__icon" />
          <span className="modal__close-btn-interactive-area" />
        </button>
        <div className="todo-title">
          {todo.title}
        </div>
        <div className="todo-description">
          {todo.description}
        </div>
        <div className="todo-form__group">
          {finishedAt}
        </div>
      </div>
    </>
  );
}
