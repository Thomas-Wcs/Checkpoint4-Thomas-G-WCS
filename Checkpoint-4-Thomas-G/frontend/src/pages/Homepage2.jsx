import { useNavigate } from "react-router-dom";
import UserFavorite from "../components/dashbord/UserFavorite";
import AccountMenu2 from "../components/dashbord/AccountMenu2";
import { useAuth } from "../context/AuthContext";
import logoFront from "../assets/images.png";
import logoVintage from "../assets/motorcycle1.png";
import "../scss/index.css";

function Homepage2() {
  const { userInfo, reset } = useAuth();
  const firstname = userInfo?.firstname || "";
  const navigate = useNavigate();

  return (
    <div className="main-homepage-conteneur">
      <div
        className="conteneur-image-logo-home
      "
      >
        <img
          className="logo-front-moto"
          src={logoFront}
          alt="logo jaune avec une moto"
        />
        <h2 className="moto-api-title">Moto'API</h2>
        <img
          className="logo-vintage-moto"
          src={logoVintage}
          alt="logo jaune avec une moto"
        />
      </div>

      {userInfo.email ? (
        <div>
          {" "}
          <div>
            <AccountMenu2 userInfo={{ ...userInfo, firstname }} reset={reset} />
          </div>
          <div>
            <UserFavorite />
          </div>{" "}
        </div>
      ) : (
        <div>
          <button
            className="connexion-inscription-homepage"
            type="button"
            onClick={() => navigate("/connexion")}
          >
            Connexion - Inscription
          </button>
          <div>
            <UserFavorite />
          </div>{" "}
        </div>
      )}
    </div>
  );
}

export default Homepage2;
