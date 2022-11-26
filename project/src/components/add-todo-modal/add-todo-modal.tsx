import { Modal } from '../modal/modal';
import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../db/index';
import dayjs from 'dayjs';

type Props = {
  onClose: () => void;
  onSave: () => void;
}

export function AddTodoModal({ onClose, onSave }: Props): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  console.log('date', dayjs(date).format());


  const handleTodoClick = async () => {
    try {
      const docRef = await addDoc(collection(db, "todoes"), {
        title: title,
        description: description,
        checked: false,
        finishedAt: dayjs(date).format(),
      });
      onSave();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    };
  };

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
    console.log('handleClearForm', evt.target);
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
                    aria-label="Закрыть">
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
