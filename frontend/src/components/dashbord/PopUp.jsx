import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAPI from "../../api/useAPI";

export default function PopUp() {
  const api = useAPI();
  const { state } = useLocation();

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setModal(false);
      }
    };

    if (modal) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("modal-open");
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [modal]);

  const clickEditPremium = () => {
    (async () => {
      try {
        const response = await api.get(`users/${state.userInfo.id}`);
        const { data } = response;

        await api.put(`users/${state.userInfo.id}`, {
          name: data.name,
          email: data.email,
          firstname: data.firstname,
          role: data.role,
          isPremium: data.isPremium,
          isVideoPlus: 0,
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <div>
      <button
        className="valide-mdp-button"
        type="button"
        onClick={toggleModal}
        style={{ background: "red", color: "black", borderRadius: "30px" }}
      >
        Annuler l'abonnement
      </button>
      <div>
        {modal && (
          <div className="overlay-abo-div" role="dialog" aria-modal="true">
            {modal && (
              <div className="pop-up-abo">
                <p>
                  Nous sommes vraiment désolés. Es-tu sûr(e) de vouloir
                  supprimer ton compte ? Si tu es certain(e) de ton choix, tu
                  peux cliquer sur "Confirmer". Cela entraînera la déconnexion
                  immédiate de ton compte, tu devras te reconnecter et ton
                  compte seras alors mis à jour <br /> <br />
                  Si tu hésites encore, n'hésite pas à contacter notre service
                  client. Nous serons ravis de t'aider et de trouver une
                  solution adaptée à ton abonnement.
                </p>
                <button
                  className="valide-mdp-button"
                  type="button"
                  onClick={toggleModal}
                >
                  Annuler
                </button>
                <button
                  className="valide-mdp-button"
                  type="button"
                  onClick={clickEditPremium}
                >
                  Confirmer
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
