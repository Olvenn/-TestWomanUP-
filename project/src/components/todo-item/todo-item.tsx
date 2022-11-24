import { Todo } from '../../types/types';
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../index';

type TodoProps = {
  todo: Todo;
}

const handleDeleteClick = async (id: string) => {
  await deleteDoc(doc(db, "todoes", id));
};

export function TodoItem({ todo }: TodoProps): JSX.Element {
  return (
    <div className="container-item modal__content">
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
        {todo.finishedAt}
      </div>
    </div>
  );
}
