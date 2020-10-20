import React, { useState, useEffect } from "react";
import "./Banner.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Modal/Modal";
import PaperDetail from "components/PaperDetail/PaperDetail";
import BackgroundImage from "assets/img/astrofisica.jpg";

import APICalls from "APICalls/APICalls";

const Banner = (props) => {
  const [paper, setPaper] = useState(null);
  const [category, setCategory] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setPaper(props.randomPaper);
  }, [props.randomPaper]);

  useEffect(() => {
    async function fetchedData() {
      if (paper) {
        try {
          const fetchedCategoryName = await APICalls.getCategoryName(
            paper.id_category
          );
          if (fetchedCategoryName) {
            setCategory(fetchedCategoryName);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchedData();
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
    <div
      className="banner"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
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
