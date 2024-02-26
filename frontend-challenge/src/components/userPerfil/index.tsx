import "./styles.css";
import { ReactComponent as UserPerfilImage } from "../assets/UserPerfilImage.svg";

const UserPerfil = () => {
  return (
    <div className="user-perfil-global-container">
      <div className="user-description-container">
        <p className="user-description-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit
          suscipit porttitor. Suspendisse ex lorem, rhoncus nec ante eu,
          venenatis aliquam turpis. Nulla facilisi. Curabitur nec mattis dolor.
          Nulla finibus bibendum ligula tempus vehicula. Ut at tristique libero,
          nec efficitur dui. Aliquam erat volutpat. Fusce quam sem, tempus nec
          justo eget, luctus scelerisque velit. Nam sollicitudin purus urna,
          vitae ornare neque tincidunt vel. Proin ac lacinia erat, et commodo
          felis. Phasellus tempor tellus eu vulputate tempus.
        </p>
      </div>
      <div className="user-photo-container">
        <UserPerfilImage />
      </div>
    </div>
  );
};

export default UserPerfil;
