import React, { useRef, MouseEvent } from "react";
import "./styles.css";

interface EditModalProps {
  onClose: () => void;
  onEditClick: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ onClose, onEditClick }) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target as Node)
    ) {
      onClose();
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
        <div className="delete-container">
          <p>Excluir</p>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
