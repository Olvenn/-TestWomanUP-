import { useState } from 'react';
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

/**
 * The todo element for drawing a list of elements
 * @component
 * @prop {Todo} todo
 * @prop {()=>void}
 */

export function ListItem({ todo, onSave }: TodoProps): JSX.Element {
  /**
   * The state for determining whether the todo modal is open
   * @type {[Boolean, Function]} Loading
   */
  const [showTodoModal, setShowTodoModal] = useState(false);
  /**
   * The state for determining whether the todo edit modal is open
   * @type {[Boolean, Function]} Loading
   */
  const [showEditModal, setShowEditModal] = useState(false);
  /**
   * The state for determining whether the todo edit modal is open
   * @type {[Boolean, Function]} Loading
   */
  const [complete, setСomplete] = useState(false);

  const finishedAt = humanizeData(todo.finishedAt);
  const isOverdue = getTimeDifference(todo.finishedAt) < 0;

  /**
   * Delete an todo-item from the database .
   *
   * @async
   * @function handleDeleteClick
   * @param {string} id - ID of the item being deleted.
   * @return {Promise<void>}
   */
  const handleDeleteClick = async (id: string) => {
    await deleteDoc(doc(db, "todoes", id));
    onSave()
  };

  /**
   * We note that the task has been completed in the database .
   * @async
   * @function handleDeleteClick
   */
  const handleUpdateClick = async () => {
    const frankDocRef = doc(db, "todoes", todo.id);

    await updateDoc(frankDocRef, {
      "isComplete": true,
    });

    setСomplete(true);
    onSave()
  };

  /**
   * When clicking on the 'Сompleted' button, we change the display of the element and the corresponding field in the database
   */
  const handleСompleted = () => {
    handleUpdateClick();
  };

  /**
   * When clicking on the 'More detailed' button, a todo-preview window opens
   */
  const handleAddTodoPreview = () => {
    setShowTodoModal(true);
  };

  /**
   * When clicking on the 'More detailed' button, a todo-preview window closes
   */
  const handleCloseTodo = () => {
    setShowTodoModal(false);
  };

  /**
   * When clicking on the 'More detailed' button, a todo-edit window opens
   */
  const handleEditTodo = () => {
    setShowEditModal(true);
    setShowTodoModal(false);
  };

  /**
   * When clicking on the 'More detailed' button, a todo-edit window closes
   */
  const handleEditCloseTodo = () => {
    setShowEditModal(false);
  };

  /**
   * The function of selecting styles when changing the todo status
   */
  const status = () => {
    if (todo.isComplete) {
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
        <div className="todo-form__group">
          {finishedAt}
        </div>
        <div className='btn-container'>
          {!isOverdue && !todo.isComplete && <button
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
