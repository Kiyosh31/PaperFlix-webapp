import React, { useState } from "react";
import "./PaperDetail.css";

import Button from "components/Button/Button";
import StarRating from "components/StarRating/StarRating";
import Title from "components/Title/Title";
import ModalLoading from "components/ModalLoading/ModalLoading";

import APICalls from "APICalls/APICalls";

const PaperDetail = (props) => {
  const [showLoading, setShowLoading] = useState(false);

  async function starRatingHandler(newRating) {
    setShowLoading(true);

    try {
      const fetchedRatingDetail = await APICalls.alreadyRated(
        props.paper.id_paper
      );
      if (fetchedRatingDetail === 200) {
        // ya calificaste
        console.log("ya calificaste");
        updateRatingHandler(newRating);
      } else if (fetchedRatingDetail === 204) {
        // no has calificado
        console.log("no has calificado");
        createRatingHandler(newRating);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function createRatingHandler(newRating) {
    try {
      const fetchedCreatedRating = await APICalls.createRating(
        props.paper.id_paper,
        newRating
      );
      if (fetchedCreatedRating) {
        console.log("calificacion creada");
        setShowLoading(false);
      }
    } catch (err) {
      console.log(err);
      setShowLoading(false);
    }
  }

  async function updateRatingHandler(newRating) {
    try {
      const fetchedUpdatedRating = await APICalls.updateRating(
        props.paper.id_paper,
        newRating
      );
      if (fetchedUpdatedRating) {
        console.log("calificacion actualizada");
        setShowLoading(false);
      }
    } catch (err) {
      console.log(err);
      setShowLoading(false);
    }
  }

  function paperClickHandler() {
    window.open(props.paper.url, "_blank");
  }

  return (
    <div className="paperdetail__container">
      {showLoading && <ModalLoading />}
      <Title>Acerca de: {props.paper.title}</Title>
      <p className="text">
        <strong className="text_int">Autor(es):</strong> {props.paper.author}
      </p>
      <p className="text">
        <strong className="text_int">Descripcion:</strong>{" "}
        {props.paper.description}
      </p>
      <p className="text">
        <strong className="text_int">Publicacion:</strong>{" "}
        {props.paper.publication_year}
      </p>
      <p className="text">
        <strong className="text_int">Categoria:</strong> {props.category}
      </p>
      <StarRating changed={starRatingHandler} />
      <Button clicked={paperClickHandler}>Ver el documento</Button>
    </div>
  );
};

export default PaperDetail;
