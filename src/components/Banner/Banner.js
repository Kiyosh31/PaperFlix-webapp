import React, { useState, useEffect } from "react";
import "./Banner.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Banner = (props) => {
  const [paper, setPaper] = useState([]);

  useEffect(() => {
    let index = 0;
    if (props.data && props.data.length > 1) {
      index = Math.floor(Math.random() * props.data.length - 1);
    }
    setPaper(props.data[index]);
  }, [props.data]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="banner">
      <div className="banner__contents">
        <h1 className="banner__title">{paper?.title}</h1>
        <div className="banner__button_container">
          <h1 className="banner__description">
            {truncate(paper?.description, 150)}
          </h1>
          <button className="button__content" onClick={props.openModal}>
            <FontAwesomeIcon className="icon" icon={faPlay} />
            Play
          </button>
          <button className="button__content">
            <FontAwesomeIcon className="icon" icon={faInfoCircle} /> More Info
          </button>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </div>
  );
};

export default Banner;
