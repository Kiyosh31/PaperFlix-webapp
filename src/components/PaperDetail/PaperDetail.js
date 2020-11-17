import React, { useState } from "react";
import "./PaperDetail.css";

import Button from "components/Button/Button";
import StarRating from "components/StarRating/StarRating";
import Title from "components/Title/Title";
import ModalLoading from "components/ModalLoading/ModalLoading";
import ErrorModal from "components/ErrorModal/ErrorModal";
import SuccessModal from "components/SuccessModal/SuccessModal";

import APICalls from "APICalls/APICalls";

const PaperDetail = (props) => {
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function starRatingHandler(newRating) {
    setShowLoading(true);

    try {
      const fetchedRatingDetail = await APICalls.alreadyRated(
        props.paper.id_paper
      );
      if (fetchedRatingDetail.status === 200) {
        // ya calificaste
        updateRatingHandler(newRating);
      } else if (fetchedRatingDetail.status === 202) {
        // no has calificado
        createRatingHandler(newRating);
      }
    } catch (err) {
      const errorData = ["Error al intentar calificar un articulo"];
      setError(errorData);
      setShowLoading(false);
    }
  }

  async function createRatingHandler(newRating) {
    try {
      const fetchedCreatedRating = await APICalls.createRating(
        props.paper.id_paper,
        newRating
      );
      if (fetchedCreatedRating) {
        setSuccess(["Calificacion Creada!", "Calificacion creada con exito"]);
        setShowLoading(false);
      }
    } catch (err) {
      const errorData = ["Error al crear una nueva calificacion"];
      setError(errorData);
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
        setSuccess([
          "Calificacion Actualizada!",
          "Calificacion actualizada con exito",
        ]);
        setShowLoading(false);
      }
    } catch (err) {
      const errorData = ["Error al actualizar una calificacion"];
      setError(errorData);
      setShowLoading(false);
    }
  }

  function paperClickHandler() {
    window.open(props.paper.url, "_blank");
  }

  function errorModalHandler() {
    setError(null);
  }

  function successModalHandler() {
    setSuccess(null);
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
      {error && <ErrorModal onClose={errorModalHandler} text={error} />}
      {success && <SuccessModal onClose={successModalHandler} data={success} />}
    </div>
  );
};

export default PaperDetail;
