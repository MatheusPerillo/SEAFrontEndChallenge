import "./styles.css";
import { FaRegBuilding } from "react-icons/fa";

const Topbar = () => {
  const items = new Array(9).fill(null);
  return (
    <div className="topbar-global-container">
      <div className="line"></div>
      <div className="items-container">
        {items.map((item, index) => (
          <div className="englobe-item" key={index}>
            <div className="item">
              <FaRegBuilding size={"2em"} color="white" />
            </div>
            <div className="container-item-text">
              <p className="item-text">Item {index + 1}</p>
              {/* <p className="text-status">Concluído</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topbar;
