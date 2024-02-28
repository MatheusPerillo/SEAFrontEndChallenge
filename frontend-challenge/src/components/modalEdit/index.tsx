import React, { useRef, MouseEvent } from "react";
import "./styles.css";
import axios from "axios";
import { toast } from "react-toastify";

interface EditModalProps {
  onClose: () => void;
  onEditClick: () => void;

  _id: string;
}

const EditModal: React.FC<EditModalProps> = ({ onClose, onEditClick, _id }) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${_id}`);
      console.log(response.data);
      toast.error("Usuario excluído com sucesso!", {
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      console.error("message", error);
      toast.error("Erro ao excluir usuário");
    }
  };

  return (
    <div className="close-modal" onClick={handleClickOutside}>
      <div className="edit-modal-global-container">
        <div
          className="edit-container"
          ref={modalContentRef}
          onClick={onEditClick}
        >
          <p>Alterar</p>
        </div>
        <div className="delete-container" onClick={handleDeleteUser}>
          <p>Excluir</p>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
