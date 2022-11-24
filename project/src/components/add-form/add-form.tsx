import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../index';

export function AddForm(): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  const handleTodoClick = async () => {
    try {
      const docRef = await addDoc(collection(db, "todoes"), {
        title: title,
        description: description,
        checked: false,
        finishedAt: 'sate',
      });
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

  const handleClearForm = () => {
    setDate(new Date());
    setTitle('');
    setDescription('');
    console.log('handleClearForm');
  };

  return (
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
              className="btn btn--secondary">
              Clear
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
