import React, { useEffect, useRef, useState } from "react";
import "./aboutPage.css";
// import filmbanderole from "../../assets/filmband.png";
import useAPI from "../../api/useAPI";

function AboutPage() {
  const [data, setData] = useState([]);
  const api = useAPI();
  const hiddenElementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    hiddenElementsRef.current.forEach((el) => observer.observe(el));
  }, [data]);

  useEffect(() => {
    api.get("users").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="about-main-section">
      {/* <img className="film-banderole-about" src={filmbanderole} alt="" /> */}
      <div className="texte-about-propos">
        <h1>A propos</h1>
        <p className="about-para-profil-section">
          <br />
          <br /> "Découvrez l'univers envoûtant des motos sur notre site
          d'actualités dédié ! Restez informé(e) des dernières tendances, des
          nouveaux modèles, des courses palpitantes et des conseils d'experts
          passionnés. Vivez la passion de la moto à travers nos articles concis
          et percutants. Rejoignez-nous et partagez votre amour de la route sur
          deux roues !"
          <br />
          <br /> "Bientôt, vous pourrez partager la beauté de votre moto avec
          notre communauté en téléchargeant vos propres photos ! Restez à
          l'affût !" <br />
          <br />
          <br />
          Merci cher <strong>motard</strong> de partager ce site à tous tes amis
          motards !<strong> Moto'API </strong>
          <br />
          <br />
          Voici une brève présentation de l'équipe :
        </p>
      </div>
      {data.slice(0, 4).map((item, index) => (
        <section
          className="hidden"
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          // eslint-disable-next-line no-return-assign
          ref={(ref) => (hiddenElementsRef.current[index] = ref)}
        >
          <img
            className="profil-about-image"
            src={`${import.meta.env.VITE_APP_API_URL}${item.avatar}`}
            alt="developpeur"
          />
          <h2> {item.firstname}</h2>
          <h2> {item.name} </h2>
          <p className="about-para-profil-section">{item.descriptionProfil}</p>
        </section>
      ))}
      <div> COUCOU </div>
    </div>
  );
}

export default AboutPage;
