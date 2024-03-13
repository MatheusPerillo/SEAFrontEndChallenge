import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./App.css";

import Rotas from "./routes";
import store from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Rotas />
      <ToastContainer />
    </Provider>
  );
};

export default App;
