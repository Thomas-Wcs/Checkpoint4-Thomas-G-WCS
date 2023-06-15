import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VideoDes.css";
import useAPI from "../api/useAPI";

export default function VideoDescription() {
  const api = useAPI();
  const { id } = useParams();
  const [newImage, setNewImage] = useState([]);

  useEffect(() => {
    api.get(`images/${id}`).then((res) => setNewImage(res.data));
  }, [id]);

  return (
    <div className="image-description-single-page">
      {newImage?.date_publication && (
        <div className="image-description-single-page" />
      )}
      <img
        className="image-descrip-single-page"
        src={`${import.meta.env.VITE_APP_API_URL}${newImage.link}`}
        alt="une moto"
      />
      <h1>{newImage.title}</h1>
      <p className="para-descri-singlepage"> {newImage.description_text} </p>
    </div>
  );
}
