import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useAPI from "../api/useAPI";

export default function VideoDescription() {
  const api = useAPI();
  const { id } = useParams();
  const [newImage, setNewImage] = useState([]);

  useEffect(() => {
    api.get(`images/${id}`).then((res) => setNewImage(res.data));
  }, [id]);

  return (
    <div id="video-main">
      {newImage?.date_publication && <div id="video-display" />}
      <img src={`${import.meta.env.VITE_APP_API_URL}${newImage.link}`} alt="" />
      <h1>{newImage.title}</h1>
      <p> {newImage.description_text} </p>
    </div>
  );
}
