import { Todo } from '../../types/types';
import { Modal } from '../modal/modal';
import { humanizeData, getTimeDifference } from '../../utils';

type TodoProps = {
  todo: Todo;
  onClose: () => void;
}

export function TodoItem({ todo, onClose }: TodoProps): JSX.Element {
  const finishedAt = humanizeData(todo.finishedAt);
  const isOverdue = getTimeDifference(todo.finishedAt) < 0;

  return (
    <div style={{ position: 'absolute', width: '100%', height: '440px', margin: '0 auto', marginBottom: '50px' }}>
      <div className="modal is-active">
        <Modal onClose={onClose}>
          <header className="header">
            <div className="container-item modal__content">
              <div className="header__title">
                {todo.title}
              </div>
              <div className="todo-description">
                {todo.description}
              </div>
              <div className="header__data">
                {isOverdue ?
                  <span className="header__data--overdue">Todo is overdue:</span> :
                  <span className="header__data--text">End date:</span>
                }
                {finishedAt}
              </div>
            </div>
          </header>
        </Modal>
      </div>
    </div >
  );
};
