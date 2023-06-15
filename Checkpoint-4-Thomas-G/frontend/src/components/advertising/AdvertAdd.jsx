import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../api/useAPI";

function AdvertAdd() {
  const navigate = useNavigate();

  const [pictures, setPictures] = useState("");
  const [descriptionTextAdv, setdescriptionTextAdv] = useState("");
  const [lienURL, setLienURL] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [advertChanging, setAdvertChanging] = useState(true);

  const api = useAPI();
  const handleAddAdvert = (e) => {
    e.preventDefault();

    const formAdvertData = new FormData();
    formAdvertData.append("pictures", pictures);
    formAdvertData.append("text", descriptionTextAdv);
    formAdvertData.append("lienArticle", lienURL);
    formAdvertData.append("picture_link", fileUpload);

    api
      .post("/adverts", formAdvertData)
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
        <label htmlFor="picture_link">
          <input
            type="file"
            name="picture_link"
            onChange={(e) => setFileUpload(e.target.files[0])}
            id="file-selection-button"
          />
        </label>
        <button
          type="submit"
          className="sectionUpdateButton"
          onClick={handleAddAdvert}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default AdvertAdd;
