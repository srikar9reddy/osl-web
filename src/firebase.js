import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC0bM1vxxKmpG0WE3CEBnIGl_Cu6RwI0Ks",
  authDomain: "oversteer-a3c75.firebaseapp.com",
  projectId: "oversteer-a3c75",
  storageBucket: "oversteer-a3c75.appspot.com",
  messagingSenderId: "537973705592",
  appId: "1:537973705592:web:a2b6def44089db7e3f968d"
};

const app = initializeApp(firebaseConfig);

export default app;