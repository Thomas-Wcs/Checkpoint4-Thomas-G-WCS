import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useAPI from "../../api/useAPI";
import { useAuth } from "../../context/AuthContext";
import backImg from "../../assets/moto4.jpg";
import backImg2 from "../../assets/moto3.jpg";

export default function Registration({
  registrationMail,
  setRegistrationMail,
  mail,
  setMail,
  mdp,
  setMdp,
  handleSubmit,
}) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { success, setSuccess } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const api = useAPI();

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const newUser = {
      name: userName,
      email: registrationMail,
      mdp: password,
    };
    api
      .post("users/", newUser)
      .then((result) => {
        if (result.status === 201) {
          api
            .post("nodeMailer/sendWelcome", newUser)
            .then((response) => {
              if (response.status === 200) {
                navigate("/");
              }
            })
            .catch((err) => console.error(err));
        }
        setSuccess(!success);
        return result;
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setErrorMessage("Nom d'utilisateur déjà utilisé");
          console.error(err);
        }
      });
  };

  return success ? (
    <div id="connection">
      <h2>Créez votre compte :</h2>
      <img src={backImg} alt="" className="connection-bg" />
      <input
        type="text"
        className="user-input"
        value={registrationMail}
        onChange={(e) => setRegistrationMail(e.target.value)}
        placeholder="Adresse mail "
      />
      <input
        type="text"
        className="user-input"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Nom "
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input
        type="password"
        className="user-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe "
      />

      <input
        type="submit"
        onClick={handleSubmitRegister}
        className="user-button"
      />
    </div>
  ) : (
    <div id="connection">
      <img src={backImg2} alt="" className="connection-bg" />
      <h2> Felicitation! Vous pouvez maintenant vous connecter!</h2>
      <input
        id="username"
        type="text"
        name="username"
        className="user-input"
        placeholder="Email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <input
        type="password"
        name="motdepasse"
        className="user-input"
        placeholder="Mot de Passe"
        value={mdp}
        onChange={(e) => setMdp(e.target.value)}
      />
      <button type="submit" className="user-button" onClick={handleSubmit}>
        Connexion
      </button>
    </div>
  );
}

Registration.propTypes = {
  registrationMail: PropTypes.string.isRequired,
  setRegistrationMail: PropTypes.func.isRequired,
  mail: PropTypes.string.isRequired,
  setMail: PropTypes.func.isRequired,
  mdp: PropTypes.string.isRequired,
  setMdp: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
