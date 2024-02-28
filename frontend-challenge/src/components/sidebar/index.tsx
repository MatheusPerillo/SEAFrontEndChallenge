import React, { useState } from "react";
import "./styles.css";
import { IconContext } from "react-icons";
import { FaRegBuilding } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BsDiagram3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const icons = [
  FaRegBuilding,
  FaEdit,
  BsDiagram3Fill,
  FaBell,
  FaClockRotateLeft,
  FaUser,
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState<number>(1);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  const handleIconClick = (index: number) => {
    setSelectedIcon(index);
    switch (index) {
      case 0:
        navigate("/items");
        break;
      case 1:
        navigate("/create-user");
        break;
      case 2:
        navigate("/equipes");
        break;
      case 3:
        navigate("/notificacoes");
        break;
      case 4:
        navigate("/restaurar");
        break;
      case 5:
        navigate("/perfil");
        break;
      default:
        break;
    }
  };

  return (
    <div className="sidebar-global-container">
      <div className="sm-rectangle"></div>
      <div className="icons-container">
        <IconContext.Provider value={{ color: "#649FBF", size: "1.3em" }}>
          {icons.map((Icon, index) => (
            <div
              className="icon-select-global-container"
              onClick={() => handleIconClick(index)}
              onMouseEnter={() => setHoveredIcon(index)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div className="selected-icon-container">
                {(selectedIcon === index || hoveredIcon === index) && (
                  <div className="selected-icon"></div>
                )}
              </div>
              <div className="icon-rendered-container">
                <div
                  className={`icon ${selectedIcon === index ? "selected" : ""}`}
                  key={index}
                >
                  <Icon />
                </div>
              </div>
            </div>
          ))}
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Sidebar;
