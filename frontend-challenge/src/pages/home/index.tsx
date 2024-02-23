import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import "./styles.css";
import { ReactComponent as BackgroundImage } from "./components/assets/BackgroundImage.svg";
import UserPerfil from "../../components/userPerfil";
import AddViewUser from "../../components/AddViewUser";

function Home() {
  return (
    <div className="global-container">
      <div className="lateral-container">
        <Sidebar />
      </div>
      <div className="central-container">
        <div className="topbar-container">
          <Topbar />
        </div>
        <div className="user-global-container">
          <div className="perfil-container">
            <UserPerfil />
          </div>
          <div className="global-form-container">
            <div className="form-container">
              <AddViewUser />
            </div>
            <div className="button-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
