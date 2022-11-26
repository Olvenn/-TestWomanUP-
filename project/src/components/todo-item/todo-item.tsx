import { Todo } from '../../types/types';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../db/index';
import dayjs from 'dayjs';

type TodoProps = {
  todo: Todo;
  onSave: () => void;
}

export function TodoItem({ todo, onSave }: TodoProps): JSX.Element {
  const finishedAt = dayjs(todo.finishedAt).format('DD MMM YYYY');
  const isOverdue = dayjs(todo.finishedAt).diff(dayjs((new Date()))) < 0;

  const handleDeleteClick = async (id: string) => {
    await deleteDoc(doc(db, "todoes", id));
    onSave()
  };

  return (
    <div className={`${isOverdue ? 'container-item modal__content overdue' : 'container-item modal__content'}`}
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
  );
}
