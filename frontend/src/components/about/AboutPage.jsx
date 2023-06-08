import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./aboutPage.css";
import logoOrigins from "../../assets/images.png";
import useAPI from "../../api/useAPI";

function AboutPage() {
  const [data, setData] = useState([]);
  const api = useAPI();
  const hiddenElementsRef = useRef([]);
  const toto = useRef([]);

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

    return () => {
      hiddenElementsRef.current.forEach((el) => observer.unobserve(el));
    };
  }, [data]);

  useEffect(() => {
    api.get("users").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="about-main-section">
      {data.map((item, index) => (
        <section
          className="hidden"
          key={uuidv4()}
          // eslint-disable-next-line no-return-assign
          ref={(ref) => (hiddenElementsRef.current[index] = ref)}
        >
          <h2 ref={toto}> NOM : {item.name} </h2>
          <p>
            Bienvenue sur notre plateforme vidéo en ligne ! Nous nous engageons
            à vous fournir une large sélection de vidéos de haute qualité pour
            votre divertissement. Que vous recherchiez des films, des séries
            télévisées, des documentaires ou du contenu éducatif, nous avons ce
            qu'il vous faut.
          </p>
          <img src={logoOrigins} alt="" />
          <button type="button">Contactez-nous</button>
        </section>
      ))}
    </div>
  );
}

export default AboutPage;
