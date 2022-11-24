import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getDatabase, ref, push } from "firebase/database";

// Import firebase configuration from firebase.ts file
import firebaseApp from '../../firebase';
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";

export const TodoForm = () => {
  const db = getDatabase(firebaseApp);

  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addTodo = () => {
    const todoRef = ref(db, "todos");
    const todo = {
      title,
      done: false,
    };
    push(todoRef, todo);
  };

  return (
    <Form>
      <Form.Control onChange={handleChange} />
      <Button type="submit" onClick={addTodo}>
        Submit
      </Button>
    </Form>
  )
}

// export default TodoForm;