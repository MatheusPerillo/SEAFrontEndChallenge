import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import "./styles.css";
import UserPerfil from "../../components/userPerfil";
import AddViewUser from "../../components/AddViewUser";
import { useEffect, useState } from "react";
import EmBreve from "../../components/emBreve";
import { Footer } from "antd/es/layout/layout";
import AddForm from "../../components/addForm";
import EditForm from "../../components/editForm";

export default function CreateUser() {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [currentItem, setCurrentItem] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewState, setViewState] = useState<
    "AddViewUser" | "AddForm" | "EditForm"
  >("AddViewUser");
  const [editingUserId, setEditingUserId] = useState<string>("");
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

  // useEffect(() => {
  //   setIsFormVisible(isEditing);
  // }, [isEditing]);

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
                  {viewState === "EditForm" && (
                    <EditForm _id={editingUserId} setViewState={setViewState} />
                  )}
                  {viewState === "AddForm" && (
                    <AddForm setViewState={setViewState} />
                  )}
                  {viewState === "AddViewUser" && (
                    <AddViewUser
                      setViewState={setViewState}
                      setSwitchState={handleSwitchChange}
                      setEditingUserId={setEditingUserId}
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
              className={`button-next-step ${
                isSwitchChecked ? "enabled" : ""
              } ${
                viewState === "AddForm" || viewState === "EditForm"
                  ? "form-visible"
                  : ""
              }`}
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
