import "./styles.css";
import { Example1, Example2, Example3 } from "./Example1";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTEiYKZfi1vifzCxl6ZmZe5QZN40vnJso",
  authDomain: "mycloudrunproject-348105.firebaseapp.com",
  projectId: "mycloudrunproject-348105",
  storageBucket: "mycloudrunproject-348105.appspot.com",
  messagingSenderId: "814141392729",
  appId: "1:814141392729:web:2012f34155d592e0986e48",
  measurementId: "G-8ZT3R4BKD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Example1 />
        <Example2 />
        <Example3 />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}
