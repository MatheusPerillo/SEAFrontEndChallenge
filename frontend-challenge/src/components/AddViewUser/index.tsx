import { useState } from "react";
import "./styles.css";

import { Switch } from "antd";
import UserDescription from "./userDescription";

interface AddViewUserProps {
  setSwitchState: (value: boolean) => void;
  onEditClick: () => void;
}

const AddViewUser: React.FC<AddViewUserProps> = ({
  setSwitchState,
  onEditClick,
}) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchChecked(checked);
    setSwitchState(checked);
  };

  const [activeButton, setActiveButton] = useState("active");

  const handleClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="add-view-global-container">
      <div className="header-container">
        <p className="header-text">Funcionário(s)</p>
      </div>
      <button className="add-button-global-container" onClick={onEditClick}>
        <p className="add-button-text">+ Adicionar Funcionário</p>
      </button>
      <div className="filter-container">
        <div className="filter-buttons-container">
          <button
            className={`filter-button ${
              activeButton === "active" ? "active" : ""
            }`}
            onClick={() => handleClick("active")}
          >
            <p className={activeButton === "active" ? "active" : ""}>
              Ver apenas ativos
            </p>
          </button>
          <button
            className={`filter-button ${
              activeButton === "clean" ? "active" : ""
            }`}
            onClick={() => handleClick("clean")}
          >
            <p className={activeButton === "clean" ? "active" : ""}>
              Limpar filtros
            </p>
          </button>
        </div>
        <div className="filter-text-container">
          <p className="actives-text">Ativos 2/4</p>
        </div>
      </div>
      <div className="user-description-global-container">
        <UserDescription
          name={"Daniel Alves da Silva"}
          cpf={"000.000.000-99"}
          status={"Ativo"}
          role={"Cargo 1"}
          onEditClick={onEditClick}
        />
      </div>
      <div className="status-step-container">
        <p>A etapa está concluída?</p>
        <Switch
          checkedChildren="Sim"
          unCheckedChildren="Não"
          checked={isSwitchChecked}
          onChange={handleSwitchChange}
        />
      </div>
    </div>
  );
};

export default AddViewUser;
