import { Modal } from '../modal/modal';
import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../db/index';
import dayjs from 'dayjs';
import { Todo } from '../../types/types';

type Props = {
  onClose: () => void;
  onSave: () => void;
  todo: Todo;
}

export function AddTodoModal({ onClose, onSave, todo }: Props): JSX.Element {
  /**
   * The state for todo title
   * @type {[string, Function]} Loading
   */
  const [title, setTitle] = useState(todo.title);
  /**
   * The state for todo title
   * @type {[string, Function]} Loading
   */
  const [description, setDescription] = useState(todo.description);
  /**
   * The state for todo title
   * @type {[Date, Function]} Loading
   */
  const [date, setDate] = useState(new Date());

  const handleAddTodoClick = async () => {
    try {
      const docRef = await addDoc(collection(db, "todoes"), {
        title: title,
        description: description,
        isComplete: false,
        finishedAt: dayjs(date).format(),
      });
      onSave();
      onClose();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error(`Error adding document: `, e);
    };
  };

  const handleEditTodoClick = async () => {
    try {
      const washingtonRef = doc(db, "todoes", todo.id);
      await updateDoc(washingtonRef, {
        title: title,
        description: description,
        isComplete: false,
        finishedAt: dayjs(date).format(),
      });
      onSave();
      onClose();
    } catch (e) {
      console.error("Error adding document: ", e);
    };
  };

  const handleTodoClick = todo.id !== '' ? handleEditTodoClick : handleAddTodoClick;

  const handleTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  };

  const handleDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
  };

  const handleClearForm = (evt: { target: any; }) => {
    setDate(new Date());
    setTitle('');
    setDescription('');
  };

  return (
    <div style={{ position: 'absolute', width: '100%', height: '440px', margin: '0 auto', marginBottom: '50px' }}>
      <div className="modal is-active">
        <Modal onClose={onClose}>
          <header className="header">
            <div className="header__inner container">
              <h1 className="header__title">New Todo-item</h1>
              <form className="todo-form">
                <div className="todo-form__group">
                  <input
                    onChange={handleTitle}
                    type="text"
                    className="todo-form__input"
                    placeholder='Todo Title...'
                    value={title} />
                </div>
                <div className="todo-form__group">
                  <textarea
                    onChange={handleDescription}
                    className="todo-form__textarea"
                    id="description"
                    value={description}
                    name="description"
                    placeholder='Todo Title...'>
                    Todo Description...
                  </textarea>
                </div>
                <div className="todo-form__group">
                  <DatePicker
                    onChange={setDate}
                    value={date}
                    className="todo-form__textarea" />
                </div>
                <div className='btn-container'>
                  <button
                    className="btn btn--primary"
                    onClick={handleTodoClick}
                    type="button"
                    aria-label="??????????????">
                    Submit
                  </button>
                  <button
                    onClick={handleClearForm}
                    type="button"
                    className="btn btn--secondary">
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </header>
        </Modal>
      </div>
    </div >
  );
}
