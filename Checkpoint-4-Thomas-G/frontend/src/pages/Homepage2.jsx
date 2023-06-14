import UserFavorite from "../components/dashbord/UserFavorite";
import AccountMenu2 from "../components/dashbord/AccountMenu2";
import { useAuth } from "../context/AuthContext";
import logoFront from "../assets/images.png";
import "../scss/index.css";

function Homepage2() {
  const { userInfo, reset } = useAuth();
  const firstname = userInfo?.firstname || "";

  return (
    <div style={{ paddingTop: "200px" }}>
      <img
        className="logo-front-moto"
        src={logoFront}
        alt="logo jaune avec une moto"
      />
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
          <p style={{ color: "white" }}>CONNEXION - INSCRIPTION</p>
          <div>
            <UserFavorite />
          </div>{" "}
        </div>
      )}
    </div>
  );
}

export default Homepage2;
