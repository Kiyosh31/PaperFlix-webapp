import React, { useState, useEffect } from "react";
import "./Banner.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faListAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Modal/Modal";
import instance from "axios-instance";

const Banner = (props) => {
  const [paper, setPaper] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    instance
      .get("paper-list/")
      .then((response) => {
        if (response.data.length > 1) {
          setPaper(
            response.data[Math.floor(Math.random() * response.data.length - 1)]
          );
        } else {
          setPaper(response.data[0]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function capitalizaFirstLetter(str) {
    if (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
    }
  }

  function modalHandler() {
    setModal(!modal);
  }

  return (
    <div className="banner">
      <div className="banner__contents">
        <h1 className="banner__title">{capitalizaFirstLetter(paper?.title)}</h1>
        <div className="banner__button_container">
          <h1 className="banner__description">
            {truncate(paper?.description, 150)}
          </h1>
          <div className="separation"></div>
          <button className="button__content" onClick={modalHandler}>
            <FontAwesomeIcon className="icon" icon={faBookOpen} />
            Read
          </button>
          <button className="button__content">
            <FontAwesomeIcon className="icon" icon={faListAlt} /> My list
          </button>
        </div>
      </div>
      <div className="banner--fadeBottom" />
      {paper && (
        <Modal show={modal} modalClosedByBackdrop={modalHandler}>
          {paper.title}
        </Modal>
      )}
    </div>
  );
};

export default Banner;
