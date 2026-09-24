import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { AuthProvider } from "./context/AuthContext";


const virtualDom = ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <AuthProvider><App/></AuthProvider>
);