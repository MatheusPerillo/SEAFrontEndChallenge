import "./styles.css";
import { IconContext } from "react-icons";
import { FaRegBuilding } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BsDiagram3Fill } from "react-icons/bs";

const icons = [
  FaRegBuilding,
  FaEdit,
  BsDiagram3Fill,
  FaBell,
  FaClockRotateLeft,
  FaUser,
];

const Sidebar = () => {
  return (
    <div className="sidebar-global-container">
      <div className="sm-rectangle"></div>
      <div className="icons-container">
        <IconContext.Provider value={{ color: "#649FBF", size: "1.3em" }}>
          {icons.map((Icon, index) => (
            <div className="icon" key={index}>
              <Icon />
            </div>
          ))}
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Sidebar;
