import "./styles.css";
import { BsThreeDots } from "react-icons/bs";

export interface IUserDescription {
  name: string;
  cpf: string;
  status: string;
  role: string;
}

const UserDescription = ({ name, cpf, status, role }: IUserDescription) => {
  return (
    <div className="user-view-description-global-container">
      <div className="user-data-container">
        <div className="user-name-container">
          <p>{name}</p>
        </div>
        <div className="user-info-datas-container">
          <div className="user-cpf">
            <p>{cpf}</p>
          </div>
          <div className="user-status-job">
            <p>{status}</p>
          </div>
          <div className="user-status-role">
            <p>{role}</p>
          </div>
        </div>
      </div>
      <div className="user-menu-options">
        <BsThreeDots size={"1.5em"} color="white" />
      </div>
    </div>
  );
};

export default UserDescription;
