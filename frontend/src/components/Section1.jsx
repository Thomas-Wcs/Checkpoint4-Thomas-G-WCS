import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Featured.scss";
import "../styles/Section.scss";

import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import VideoFeatured from "./VideoFeatured";

function Section1({ sectionName }) {
  const listRef = useRef();
  const [position] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);

  function handleClick(direction) {
    const distance = listRef.current.getBoundingClientRect().x;
    if (direction === "left" && videoNumber > 0) {
      setVideoNumber(videoNumber - 1);
      listRef.current.style.transform = `translateX(${650 + distance}px)`;
    }
    if (direction === "right" && videoNumber < 5) {
      setVideoNumber(videoNumber + 1);
      listRef.current.style.transform = `translateX(${-650 + distance}px)`;
    }
  }

  return (
    <div className="list">
      <div className="wrapper-sectionName-buttons">
        <h1 className="section-name">{sectionName}</h1>
        <div className="button-wrapper">
          <button type="submit" className="follow-btn">
            À SUIVRE
          </button>
          <button
            type="submit"
            className="next-btn"
            onClick={() => handleClick("right")}
          >
            VOIR PLUS{" "}
          </button>
        </div>
      </div>

      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          disabled={position === 0}
        />
        <div className="container container-section" ref={listRef}>
          <VideoFeatured width="650px" height="450px" displayDescription />
          <VideoFeatured width="650px" height="450px" displayDescription />
          <VideoFeatured width="650px" height="450px" displayDescription />
          <VideoFeatured width="650px" height="450px" displayDescription />
          <VideoFeatured width="650px" height="450px" displayDescription />
          <VideoFeatured width="650px" height="450px" displayDescription />
          <VideoFeatured width="650px" height="450px" displayDescription />
          <VideoFeatured width="650px" height="450px" displayDescription />
          <VideoFeatured width="650px" height="450px" displayDescription />
          <VideoFeatured width="650px" height="450px" displayDescription />
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

Section1.propTypes = {
  sectionName: PropTypes.string.isRequired,
};
export default Section1;
