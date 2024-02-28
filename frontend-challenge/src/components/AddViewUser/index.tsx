import { useEffect, useState } from "react";
import "./styles.css";

import { Switch } from "antd";
import UserDescription from "./userDescription";
import axios from "axios";
import { IUser } from "../../../server/src/models/user";

interface AddViewUserProps {
  setSwitchState: (value: boolean) => void;
  onEditClick: () => void;
  onAddClick: () => void;
}

const AddViewUser: React.FC<AddViewUserProps> = ({
  setSwitchState,
  onEditClick,
  onAddClick,
}) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [activeButton, setActiveButton] = useState();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersActives, setUsersActives] = useState<IUser[]>([]);
  const [buttonColor, setButtonColor] = useState({
    active: "#649FBF",
    clean: "#959595",
  });

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchChecked(checked);
    setSwitchState(checked);
    sessionStorage.setItem("isSwitchChecked", JSON.stringify(checked));
  };

  const handleClick = (buttonName: any) => {
    if (buttonName === "active") {
      setButtonColor({ active: "#959595", clean: "#649FBF" });
      setIsFilterActive(true);
    } else {
      setButtonColor({ active: "#649FBF", clean: "#959595" });
      setIsFilterActive(false);
    }
    setActiveButton(buttonName);
  };

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    return response.data;
  };

  useEffect(() => {
    const savedSwitchState = JSON.parse(
      sessionStorage.getItem("isSwitchChecked") || "false"
    );
    setIsSwitchChecked(savedSwitchState);
    setSwitchState(savedSwitchState);
  }, [setSwitchState]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users);
      setUsersActives(users);
    });
  }, []);

  return (
    <div className="add-view-global-container">
      <div className="header-container">
        <p className="header-text">Funcionário(s)</p>
      </div>
      <button className="add-button-global-container" onClick={onAddClick}>
        <p className="add-button-text">+ Adicionar Funcionário</p>
      </button>
      <div className="filter-container">
        <div className="filter-buttons-container">
          <button
            className={`filter-button ${
              activeButton === "active" ? "inactive" : "active"
            }`}
            onClick={() => handleClick("active")}
            style={{
              borderColor: buttonColor.active,
              color: buttonColor.active,
            }}
          >
            <p className={activeButton === "active" ? "inactive" : "active"}>
              Ver apenas ativos
            </p>
          </button>
          <button
            className={`filter-button ${
              activeButton === "clean" ? "inactive" : "active"
            }`}
            onClick={() => handleClick("clean")}
            style={{ borderColor: buttonColor.clean, color: buttonColor.clean }}
          >
            <p
              className={activeButton === "clean" ? "active" : "inactive"}
              style={{
                borderColor: buttonColor.clean,
                color: buttonColor.clean,
              }}
            >
              Limpar filtros
            </p>
          </button>
        </div>
        <div className="filter-text-container">
          <p className="actives-text">
            Ativos {users.filter((user) => user.status === "Ativo").length}/
            {isFilterActive
              ? users.filter((user) => user.status === "Ativo").length
              : users.length}
          </p>
        </div>
      </div>
      <div className="user-description-global-container">
        {users
          .filter((user) => (isFilterActive ? user.status === "Ativo" : true))
          .map((user) => (
            <UserDescription
              key={user.cpf}
              name={user.name}
              cpf={user.cpf}
              status={user.status}
              role={user.role}
              _id={user._id}
              onEditClick={onEditClick}
            />
          ))}
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
