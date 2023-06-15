import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../../api/useAPI";

function AdvertUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useAPI();

  const [pictures, setPictures] = useState("");
  const [descriptionTextAdv, setdescriptionTextAdv] = useState("");
  const [lienURL, setLienURL] = useState("");
  const [advertChanging, setAdvertChanging] = useState(true);

  const handleAddAdvert = (e) => {
    e.preventDefault();

    const formAdvertData = new FormData();

    formAdvertData.append("pictures", pictures);
    formAdvertData.append("text", descriptionTextAdv);
    formAdvertData.append("lienArticle", lienURL);

    api
      .put(`adverts/${id}`, formAdvertData)
      .then(() => {
        setAdvertChanging(!advertChanging);
      })
      .catch((err) => console.error(err));

    setTimeout(() => {
      navigate("/adminPanel/advertsTable");
    }, 400);
  };

  return (
    <div className="sectionUpdate">
      <h2 className="sectionUpdateTitle">Page d'articles</h2>

      <div className="sectionUpdateForm">
        <div className="sectionUpdateName">
          <label htmlFor="pictures">Description de l'article:</label>
          <input
            type="text"
            className="sectionUpdateInput"
            value={id}
            name="pictures"
          />
          <label htmlFor="pictures">Titre de l'article:</label>
          <input
            type="text"
            placeholder="Titre"
            className="sectionUpdateInput"
            value={pictures}
            onChange={(e) => setPictures(e.target.value)}
            name="pictures"
          />
          <label htmlFor="pictures">Description de l'article:</label>
          <input
            type="text"
            placeholder="Description"
            className="sectionUpdateInput"
            value={descriptionTextAdv}
            onChange={(e) => setdescriptionTextAdv(e.target.value)}
            name="pictures"
          />
          <label htmlFor="pictures">Lien URL de l'article:</label>
          <input
            type="text"
            placeholder="Lien"
            className="sectionUpdateInput"
            value={lienURL}
            onChange={(e) => setLienURL(e.target.value)}
            name="pictures"
          />
        </div>
        <button
          type="submit"
          className="sectionUpdateButton"
          onClick={handleAddAdvert}
        >
          MODIFIER
        </button>
      </div>
    </div>
  );
}

export default AdvertUpdate;
