import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAPI from "../../api/useAPI";
import { useAuth } from "../../context/AuthContext";
import "../../scss/index.css";

export default function UserFavorite() {
  const { userInfo } = useAuth();
  if (!userInfo?.isPremium) userInfo.isPremium = 0;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const api = useAPI();

  const getVideoData = async () => {
    try {
      await api.get(`images/`).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideoData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-div-profil-video">
      <div className="title-videos-favorites">
        <div className="search-bar-profil">
          <h4>Chercher une moto :</h4>
          <input
            type="text"
            placeholder="Chercher..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="video-grid">
        {filteredData.map((video, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="video-wrapper">
            <div className="video-content">
              <img
                style={{ width: "100%", height: "70%" }}
                src={`${import.meta.env.VITE_APP_API_URL}${video.link}`}
                alt=""
              />
              <div className="favorite-text-and-button">
                <h4>{video.title}</h4>
                <div>
                  {`${video.description_text.slice(0, 30)}...`}
                  <Link
                    to={`/video_description/${video.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p className="voir-plus-fav-video">voir plus</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
