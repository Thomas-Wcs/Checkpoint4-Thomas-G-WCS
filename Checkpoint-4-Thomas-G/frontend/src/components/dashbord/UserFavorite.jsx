import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAPI from "../../api/useAPI";
import { useAuth } from "../../context/AuthContext";
import "../../scss/index.css";

export default function UserFavorite() {
  const api = useAPI();
  const { userInfo } = useAuth();
  if (!userInfo?.isPremium) userInfo.isPremium = 0;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedCategories, setCheckedCategories] = useState([]);
  console.log(checkedCategories);

  const handleCheckboxChange = (event, categorie) => {
    if (event.target.checked) {
      setCheckedCategories([...checkedCategories, categorie]);
    } else {
      setCheckedCategories(
        checkedCategories.filter((cat) => cat !== categorie)
      );
    }
  };

  const uniqueCategories = data.filter((item, index) => {
    return (
      data.findIndex((object) => {
        return object.categorie_name === item.categorie_name;
      }) === index
    );
  });

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

  const checkedFilteredMapData = filteredData.filter((item) => {
    return checkedCategories.includes(item.categorie_name);
  });

  return (
    <div className="main-div-profil-video">
      <div className="title-videos-favorites">
        <div className="search-bar-profil">
          <h4>Chercher une moto :</h4>

          <input
            className="entree-text-search"
            type="text"
            placeholder="Chercher..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="homepage2-main-triple-conteneur">
        <div className="selection-des-categories">
          {uniqueCategories.map((categorie, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <label key={index}>
              <input
                type="checkbox"
                checked={checkedCategories.includes(categorie.categorie_name)}
                onChange={(event) =>
                  handleCheckboxChange(event, categorie.categorie_name)
                }
              />
              {categorie.categorie_name}
            </label>
          ))}
        </div>
        <div className="video-grid">
          {checkedCategories.length === 0
            ? filteredData.map((image, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="video-wrapper">
                  <div className="video-content">
                    <img
                      style={{ width: "100%", height: "70%" }}
                      src={`${import.meta.env.VITE_APP_API_URL}${image.link}`}
                      alt=""
                    />
                    <div className="favorite-text-and-button">
                      <h4>{image.title}</h4>
                      <div>
                        {`${image.description_text.slice(0, 30)}...`}
                        <Link
                          to={`/video_description/${image.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <p className="voir-plus-fav-video">voir plus</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : checkedFilteredMapData.map((image, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="video-wrapper">
                  <div className="video-content">
                    <img
                      style={{ width: "100%", height: "70%" }}
                      src={`${import.meta.env.VITE_APP_API_URL}${image.link}`}
                      alt=""
                    />
                    <div className="favorite-text-and-button">
                      <h4>{image.title}</h4>
                      <div>
                        {`${image.description_text.slice(0, 30)}...`}
                        <Link
                          to={`/video_description/${image.id}`}
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
        <div className="articles-afficher-actu">
          ICI LA SELECTION DE CATEGORIES
        </div>
      </div>
    </div>
  );
}
