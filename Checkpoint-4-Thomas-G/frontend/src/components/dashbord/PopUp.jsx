import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../../api/useAPI";

export default function PopUp() {
  const api = useAPI();
  const { id } = useParams();

  const [newImageData, setNewImageData] = useState();

  console.log(newImageData);

  useEffect(() => {
    const getVideoData = async () => {
      await api.get(`images/${id}`).then((res) => {
        setNewImageData(res.data);
      });
    };
    getVideoData();
  }, [id]);

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
                <button
                  className="button-pop-for-all"
                  type="button"
                  onClick={toggleModal}
                >
                  Retour
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
