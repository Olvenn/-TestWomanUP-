import { MouseEventHandler, useState } from 'react';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Todo } from '../../types/types';
import { db } from '../../db/index';
import { TodoItem } from '../todo-item/todo-item';
import { AddTodoModal } from '../add-todo-modal/add-todo-modal';
import { getTimeDifference, humanizeData } from '../../utils';

type TodoProps = {
  todo: Todo;
  onSave: () => void;
}

export function ListItem({ todo, onSave }: TodoProps): JSX.Element {
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [complete, setСomplete] = useState(false);

  const finishedAt = humanizeData(todo.finishedAt);
  const isOverdue = getTimeDifference(todo.finishedAt) < 0;

  const handleDeleteClick = async (id: string) => {
    await deleteDoc(doc(db, "todoes", id));
    onSave()
  };

  const handleUpdateClick = async () => {
    const frankDocRef = doc(db, "todoes", todo.id);

    await updateDoc(frankDocRef, {
      "checked": true,
    });

    setСomplete(true);
    onSave()
  };

  const handleСompleted = () => {
    handleUpdateClick();
  };

  const handleAddTodoPreview = () => {
    setShowTodoModal(true);
  };

  const handleCloseTodo = () => {
    setShowTodoModal(false);
  };

  const handleEditTodo = () => {
    setShowEditModal(true);
    setShowTodoModal(false);
  };

  const handleEditCloseTodo = () => {
    setShowEditModal(false);
  };

  const status = () => {
    if (todo.checked) {
      return 'container-item modal__content completed';
    } else if (isOverdue && !complete) {
      return 'container-item modal__content overdue';
    } else {
      return 'container-item modal__content';
    }
  };

  return (
    <>
      {showEditModal && (
        <AddTodoModal onClose={handleEditCloseTodo} todo={todo} onSave={onSave} />
      )}
      {showTodoModal && (
        <TodoItem onClose={handleCloseTodo} onEdit={handleEditTodo} todo={todo} />
      )}
      <div
        className={`${status()}`}
        data-title={`${isOverdue ? 'The todo is overdue.' : 'The todo is completed.'}`}>
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
        {/* <div className="todo-description">
          {todo.description}
        </div> */}
        <div className="todo-form__group">
          {finishedAt}
        </div>
        <div className='btn-container'>
          {!isOverdue && !todo.checked && <button
            onClick={handleСompleted}
            className="btn btn--primary"
            type="button"
            aria-label="Сomplete">
            Сomplete
          </button>}
          <button
            onClick={handleAddTodoPreview}
            type="button"
            className="btn btn--secondary"
            aria-label="More detailed">
            More detailed
          </button>
        </div>
      </div>
    </>
  );
}
