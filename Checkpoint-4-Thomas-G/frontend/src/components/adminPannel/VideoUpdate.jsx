import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/index.css";
import useAPI from "../../api/useAPI";

function VideoUpdate() {
  const { id } = useParams();
  const api = useAPI();
  const navigate = useNavigate();
  const [allCategory, setCategory] = useState([]);
  const [videoData, setVideoData] = useState();
  const [newvideoData, setNewVideoData] = useState();
  console.log(newvideoData);

  useEffect(() => {
    const getVideoData = async () => {
      await api.get(`images/${id}`).then((res) => {
        setVideoData(res.data);
      });
    };
    getVideoData();
  }, [id]);

  useEffect(() => {
    api.get("/category").then((res) => setCategory(res.data));
  }, [id]);

  function handleChange(e) {
    const { values } = e.target;
    let newValue;
    setNewVideoData((prevState) => ({
      ...prevState,
      [values]: newValue,
    }));
  }

  function multiUpdate() {
    api
      .put(`images/${videoData.id}`, {
        title: videoData.title,
        description_text: videoData.description_text,
        link: videoData.link,
        category_id: videoData.category_id,
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
            value={videoData?.id}
            className="sectionUpdateInput"
            onChange={handleChange}
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
            value={videoData?.title}
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="sectionUpdateName">
          <label htmlFor="description_text">Description :</label>
          <input
            type="text"
            placeholder="Description"
            className="sectionUpdateInput"
            value={videoData?.description_text}
            onChange={handleChange}
            name="description_text"
          />
        </div>
        <div className="sectionUpdateName">
          <label htmlFor="category_id"> Modifier la categorie:</label>
          {allCategory && (
            <select
              name="category_id"
              value={videoData?.category_id}
              onChange={handleChange}
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
