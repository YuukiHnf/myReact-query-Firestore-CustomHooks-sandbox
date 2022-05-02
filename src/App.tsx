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
  apiKey: "....",
  authDomain: "...",
  "...."
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
