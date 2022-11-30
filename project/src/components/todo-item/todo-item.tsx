import { useEffect, useState } from 'react';
import { Todo } from '../../types/types';
import { Modal } from '../modal/modal';
import { humanizeData, getTimeDifference } from '../../utils';
import { storage } from '../../db/index';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

type TodoProps = {
  todo: Todo;
  onClose: () => void;
  onEdit: () => void;
}

export function TodoItem({ todo, onClose, onEdit }: TodoProps): JSX.Element {
  const [imageUpload, setImageUpload] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string[]>([]);

  const finishedAt = humanizeData(todo.finishedAt);
  const isOverdue = getTimeDifference(todo.finishedAt) < 0;

  const imagesListRef = ref(storage, `${todo.id}/`);
  const nameList = new Set(fileName);

  const uploadFile = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `${todo.id}/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileName((prev) => [...prev, imageUpload.name]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileName((prev) => [...prev, item.name]);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadFile = (url: string, fileName: string) => {
    fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
      .then(res => res.blob())
      .then(res => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
      });
  };

  const handleDownload = (name: string) => {
    getDownloadURL(ref(storage, `${todo.id}/${name}`))
      .then((url) => {
        downloadFile(url, name);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  return (
    <div style={{ position: 'absolute', height: '440px', margin: '0 auto', marginBottom: '50px' }}>
      <div className="modal is-active">
        <Modal onClose={onClose}>
          <header className="header header__item">
            <div >
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
            <div className="file-upload">
              <div className="input-file__btn">Select the file to upload to the database</div>
              <div className="file-upload__wrap-btn">
                <label>
                  <input
                    onChange={(event) => {

                      if (event.target.files && event.target.files?.length > 0) {
                        console.log(event.target.files[0]);
                        setImageUpload(event.target.files[0]);
                      }
                    }}
                    type="file"
                    className="input-file__input"
                  />
                </label>
                <button
                  onClick={uploadFile}
                  className="file-upload__btn">
                  Upload to Firebase
                </button>
              </div>

            </div>
            <div className="download__title ">Download the file to your computer</div>
            {Array.from(nameList).map((name) => {
              return <div
                key={name}
                onClick={() => handleDownload(name)}
                className="btn__file"
              >
                {name}
              </div>;
            })}
            <button
              onClick={onEdit}
              type="button"
              className="btn btn--secondary btn--edit">
              Edit todo
            </button>
          </header>
        </Modal>
      </div>
    </div >
  );
};
