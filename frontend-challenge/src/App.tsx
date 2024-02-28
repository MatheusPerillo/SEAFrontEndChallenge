import React from "react";
import "./App.css";
import Rotas from "./routes";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <>
      <Rotas />
      <ToastContainer />
    </>
  );
};

export default App;
