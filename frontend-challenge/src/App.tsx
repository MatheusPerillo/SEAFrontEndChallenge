import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import { ReactComponent as BackgroundImage } from "./components/assets/BackgroundImage.svg";

function App() {
  return (
    <div className="global-container">
      {/* <div
        className="image-container"
        style={{
          position: "absolute",
          right: "-90px",
          bottom: "-97px",
          zIndex: "2",
        }}
      >
        <BackgroundImage />
      </div> */}
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="topbar-container">
        <Topbar />
      </div>
    </div>
  );
}

export default App;
