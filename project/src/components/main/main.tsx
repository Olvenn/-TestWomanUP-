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

  const [urlOne, setUrlOne] = useState('');

  // const starsRef = ref(storage, 'images/catalog-product-1.jpg');
  // console.log('starsRef', starsRef.fullPath);

  // getDownloadURL(starsRef)
  //   .then((url) => {
  //     setUrlOne(url);
  //   })
  //   .catch((error) => {
  //     // A full list of error codes is available at
  //     // https://firebase.google.com/docs/storage/web/handle-errors
  //     switch (error.code) {
  //       case 'storage/object-not-found':
  //         // File doesn't exist
  //         break;
  //       case 'storage/unauthorized':
  //         // User doesn't have permission to access the object
  //         break;
  //       case 'storage/canceled':
  //         // User canceled the upload
  //         break;

  //       // ...

  //       case 'storage/unknown':
  //         // Unknown error occurred, inspect the server response
  //         break;
  //     }
  //   });
  // console.log(urlOne);

  // https://firebasestorage.googleapis.com/v0/b/todo-test-1148b.appspot.com/o/images%2Frobots.txt?alt=media&token=48fff041-36b4-4bdc-a92a-7ba69ed8faa9

  // getDownloadURL(ref(storage, `images%2Frobots.txt?alt=media&token=48fff041-36b4-4bdc-a92a-7ba69ed8faa9`))
  //   .then((url) => {
  //     // `url` is the download URL for 'images/stars.jpg'
  //     console.log('url', url);

  //     // This can be downloaded directly:
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = 'blob';
  //     xhr.onload = (event) => {
  //       const blob = xhr.response;
  //     };
  //     xhr.open('GET', url);
  //     xhr.send();

  //     // Or inserted into an <img> element
  //     // const img = document.getElementById('myimg');
  //     // img.setAttribute('src', url);
  //   })
  //   .catch((error) => {
  //     // Handle any errors
  //   });
  // const  starsRef = storage.Child("test.txt");
  // string link = starsRef.GetDownloadUrlAsync().ToString();

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
        // `url` is the download URL for 'images/stars.jpg'
        console.log('url', url);

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element
        // const img = document.getElementById('myimg');
        // img.setAttribute('src', url);
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
        <button
          onClick={handleDownload}
          className="btn__new">
          Download
        </button>
        {/* {Array.from(urlList).map((url) => {
          return <a href="https://firebasestorage.googleapis.com/v0/b/todo-test-1148b.appspot.com/o/images%2Frobots.txt?alt=media&token=48fff041-36b4-4bdc-a92a-7ba69ed8faa9" rel="noopener noreferrer" download> Download Here </a>;
        })} */}
      </div>
    </div>);
}
