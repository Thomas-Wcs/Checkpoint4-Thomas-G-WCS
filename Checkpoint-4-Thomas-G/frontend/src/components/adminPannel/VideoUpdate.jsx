import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/index.css";
import useAPI from "../../api/useAPI";

function VideoUpdate() {
  const { id } = useParams();
  const api = useAPI();
  const navigate = useNavigate();
  const [allCategory, setCategory] = useState([]);
  const [newImageData, setNewImageData] = useState();
  // eslint-disable-next-line no-restricted-syntax
  console.log(newImageData);

  useEffect(() => {
    const getVideoData = async () => {
      await api.get(`images/${id}`).then((res) => {
        setNewImageData(res.data);
      });
    };
    getVideoData();
  }, [id]);

  useEffect(() => {
    api.get("/category").then((res) => setCategory(res.data));
  }, [id]);

  function handleChangeTitle(e) {
    const values = e.target.value;
    setNewImageData((prevState) => ({
      ...prevState,
      title: values,
    }));
  }

  function handleChangeDescription(e) {
    const values = e.target.value;
    setNewImageData((prevState) => ({
      ...prevState,
      description_text: values,
    }));
  }

  function handleChangeCategory(e) {
    const values = e.target.value;
    setNewImageData((prevState) => ({
      ...prevState,
      category_id: values,
    }));
  }

  function multiUpdate() {
    api
      .put(`images/${newImageData.id}`, {
        title: newImageData.title,
        description_text: newImageData.description_text,
        link: newImageData.link,
        category_id: newImageData.category_id,
      })
      .then(() => {
        navigate("/adminPanel/videosTable");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    multiUpdate();
  }

  return (
    <div className="sectionUpdate">
      <h2 className="sectionUpdateTitle">Edition de la video</h2>
      <form className="sectionUpdateForm" onSubmit={handleSubmit}>
        <div className="sectionUpdateId">
          <label htmlFor="id">Identifiant de la video :</label>
          <input
            type="text"
            placeholder="id"
            value={newImageData?.id}
            className="sectionUpdateInput"
            name="id"
            disabled
          />
        </div>
        <div className="sectionUpdateName">
          <label htmlFor="title">Titre de l'image :</label>
          <input
            type="text"
            placeholder="Titre de la video"
            className="sectionUpdateInput"
            value={newImageData?.title}
            onChange={handleChangeTitle}
            name="title"
          />
        </div>
        <div className="sectionUpdateName">
          <label htmlFor="description_text">Description :</label>
          <input
            type="text"
            placeholder="Description"
            className="sectionUpdateInput"
            value={newImageData?.description_text}
            onChange={handleChangeDescription}
            name="description_text"
          />
        </div>
        <div className="sectionUpdateName">
          <label htmlFor="category_id"> Modifier la categorie:</label>
          {allCategory && (
            <select
              name="category_id"
              value={newImageData?.category_id}
              onChange={handleChangeCategory}
              className="selecter"
            >
              {allCategory.map((cat, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <option value={cat.id} key={index}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <button type="submit" className="sectionUpdateButton">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}

export default VideoUpdate;
