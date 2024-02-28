import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import "./styles.css";
import { ReactComponent as BackgroundImage } from "./components/assets/BackgroundImage.svg";
import UserPerfil from "../../components/userPerfil";
import AddViewUser from "../../components/AddViewUser";
import { useState } from "react";
import EmBreve from "../../components/emBreve";
import Form from "../../components/form";
import { Footer } from "antd/es/layout/layout";

export default function CreateUser() {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [isNextStepClicked, setIsNextStepClicked] = useState(false);
  const [currentItem, setCurrentItem] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [completedItems, setCompletedItems] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const onEditClick = () => {
    setIsEditing(true);
    setIsAdding(false);
  };

  const onAddClick = () => {
    setIsEditing(true);
    setIsAdding(true);
  };

  const handleNextStepClick = () => {
    if (currentItem <= 9) {
      setCurrentItem(currentItem + 1);
      if (isSwitchChecked) {
        const newCompletedItems = [...completedItems];
        newCompletedItems[currentItem - 1] = true;
        setCompletedItems(newCompletedItems);
      }
    }
  };

  const handlePreviousStepClick = () => {
    if (currentItem > 1) {
      const newCompletedItems = [...completedItems];
      newCompletedItems[currentItem - 1] = false;
      setCompletedItems(newCompletedItems);
      setCurrentItem(currentItem - 1);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchChecked(checked);
    if (checked && currentItem === 1) {
      const newCompletedItems = [...completedItems];
      newCompletedItems[0] = true;
      setCompletedItems(newCompletedItems);
    } else if (!checked && currentItem === 1) {
      const newCompletedItems = [...completedItems];
      newCompletedItems[0] = false;
      setCompletedItems(newCompletedItems);
    }
  };

  return (
    <div className="global-container">
      <div className="lateral-container">
        <Sidebar />
      </div>
      <div className="central-container">
        <div className="topbar-container">
          <Topbar
            isSwitchChecked={isSwitchChecked}
            currentItem={currentItem}
            completedItems={completedItems}
          />
        </div>
        <div className="user-global-container">
          {currentItem > 1 ? (
            <div className="soon-global-container">
              <EmBreve />
            </div>
          ) : (
            <>
              <div className="perfil-container">
                <UserPerfil />
              </div>
              <div className="global-form-container">
                <div className="form-container">
                  {isEditing ? (
                    <Form
                      setIsAdding={setIsAdding}
                      setIsEditing={setIsEditing}
                      isAdding={isAdding}
                    />
                  ) : (
                    <AddViewUser
                      setSwitchState={handleSwitchChange}
                      onEditClick={onEditClick}
                      onAddClick={onAddClick}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="button-container">
          <div className="previous-button-container">
            {currentItem > 1 && (
              <button
                className="button-previous-step"
                onClick={handlePreviousStepClick}
              >
                <p>Passo anterior</p>
              </button>
            )}
          </div>
          <Footer className="next-button-container">
            <button
              className={`button-next-step ${isSwitchChecked ? "enabled" : ""}`}
              disabled={!isSwitchChecked}
              onClick={handleNextStepClick}
            >
              <p>Próximo passo</p>
            </button>
          </Footer>
        </div>
      </div>
    </div>
  );
}
