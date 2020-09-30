import React, { useState, useEffect } from "react";
import "./Banner.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import Modal from "components/Modal/Modal";
import instance from "axios-instance";
import PaperDetail from "components/PaperDetail/PaperDetail";

const Banner = (props) => {
  const [paper, setPaper] = useState(null);
  const [category, setCategory] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    instance
      .get("paper-list/")
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length > 1) {
            setPaper(
              response.data[
                Math.floor(Math.random() * response.data.length - 1)
              ]
            );
          } else {
            setPaper(response.data[0]);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (paper) {
      instance
        .get(`category-detail/${paper.id_category}/`)
        .then((response) => {
          if (response.status === 200) {
            setCategory(response.data.category);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [paper]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function modalHandler() {
    setModal(!modal);
  }

  function openPaperHandler() {
    if (paper) {
      window.open(paper.url, "_blank");
    }
  }

  return (
    <div className="banner">
      <div className="banner__contents">
        <h1 className="banner__title">{truncate(paper?.title, 30)}</h1>
        <div className="banner__button_container">
          <h1 className="banner__description">
            {truncate(paper?.description, 150)}
          </h1>
          <div className="separation"></div>
          <button className="button__content" onClick={openPaperHandler}>
            <FontAwesomeIcon className="icon" icon={faBookOpen} />
            Leer
          </button>
          <button className="button__content" onClick={modalHandler}>
            <FontAwesomeIcon className="icon" icon={faInfoCircle} /> Mas
            informacion
          </button>
        </div>
      </div>
      <div className="banner--fadeBottom" />
      {paper && (
        <Modal show={modal} modalClosedByBackdrop={modalHandler}>
          <PaperDetail paper={paper} category={category} />
        </Modal>
      )}
    </div>
  );
};

export default Banner;
