import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAYveyY1J9FwFALpXhcgMm2ih3_jgUtT0s",
  authDomain: "todo-test-1148b.firebaseapp.com",
  projectId: "todo-test-1148b",
  storageBucket: "todo-test-1148b.appspot.com",
  messagingSenderId: "32232180530",
  appId: "1:32232180530:web:e5da13bf705605f4fa252b"
};

const app = initializeApp(firebaseConfig);

export default app;