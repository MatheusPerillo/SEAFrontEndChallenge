import React, { useState } from "react";
import "./styles.css";
import { BsThreeDots } from "react-icons/bs";
import EditModal from "../../modalEdit";

export interface IUserDescription {
  name: string;
  cpf: string;
  status: string;
  role: string;
  _id: string;
  onEditClick: () => void;
}

const UserDescription = ({
  name,
  cpf,
  status,
  role,
  _id,
  onEditClick,
}: IUserDescription) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="user-view-description-global-container">
      <div className="user-data-container" data-status={status}>
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
      <div className="user-menu-options" onClick={handleOpenModal}>
        <BsThreeDots size={"1.5em"} color="white" />
      </div>
      {isModalOpen && (
        <EditModal
          onClose={handleCloseModal}
          onEditClick={onEditClick}
          _id={_id}
        />
      )}
    </div>
  );
};

export default UserDescription;
