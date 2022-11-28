import { MouseEventHandler, useEffect, useState } from 'react';
import { AddTodoModal } from '../add-todo-modal/add-todo-modal';
import dayjs from 'dayjs';
import { storage } from '../../db/index';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from 'uuid';

type Props = {
  onSave: () => void;
}

export function Main({ onSave }: Props): JSX.Element {
  const [showNewTodoModal, setShowNewTodoModal] = useState(false);
  const [imageUpload, setImageUpload] = useState<any | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imagesListRef = ref(storage, "images/");
  console.log('imageUpload', imageUpload);
  console.log('imageUrls', imageUrls);

  const urlList = new Set(imageUrls);

  const uploadFile = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    // const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todo = {
    id: '',
    title: '',
    description: '',
    checked: false,
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
      <div>
        {/* <a href={myPDF} download="My_File.pdf"> Download Here </a> */}
        <input
          type="file"
          onChange={(event) => {

            if (event.target.files && event.target.files?.length > 0) {
              console.log(event.target.files[0]);
              setImageUpload(event.target.files[0]);
            }
          }}
        />
        <button onClick={uploadFile}>Upload to Firebase</button>
        {Array.from(urlList).map((url) => {
          return <img src={url} alt="" />;
        })}
        {Array.from(urlList).map((url) => {
          return <a href={url} rel="noopener noreferrer" download> Download Here </a>;
        })}
      </div>
    </div>);
}
