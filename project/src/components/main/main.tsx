import { useEffect, useState } from 'react';
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
  // console.log('imageUpload', imageUpload);
  // console.log('imageUrls', imageUrls);

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

  const downloadFile = (url: string, fileName: string) => {
    fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
      .then(res => res.blob())
      .then(res => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        // aElement.setAttribute('href', href);
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
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

  const handleDownload = () => {
    getDownloadURL(ref(storage, `images/catalog-product-1.jpg`))
      .then((url) => {
        downloadFile(url, 'catalog-product-1.jpg');
      })
      .catch((error) => {
        // Handle any errors
      });
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
          return <img key={url} src={url} alt="" />;
        })}
        <button
          onClick={() => handleDownload()}
          className="btn__new"
        >
          Download

        </button>
        {Array.from(urlList).map((url) => {
          return <button
            key={url}
            onClick={() => handleDownload()}
            className="btn__new"
          >
            Download
          </button>;
        })}
      </div>
    </div>);
}
