import "react-multi-carousel/lib/styles.css";
import { useAuth } from "../../context/AuthContext";
import AccountMenu from "../dashbord/AccountMenu";

export default function Profile() {
  const { userInfo, reset } = useAuth();
  const firstname = userInfo?.firstname || "";

  return (
    <div id="profil-display">
      <h1 className="section-title">Profil</h1>
      <div className="account-menu-display">
        <AccountMenu userInfo={{ ...userInfo, firstname }} reset={reset} />
      </div>
    </div>
  );
}
