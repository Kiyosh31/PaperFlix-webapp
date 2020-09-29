import React, { useState } from "react";
import "./PaperDetail.css";

import Button from "components/Button/Button";
import StarRating from "components/StarRating/StarRating";
import Title from "components/Title/Title";
import instance from "axios-instance";
import Cookies from "js-cookie";
import ModalLoading from "components/ModalLoading/ModalLoading";
import ModalError from "components/ModalError/ModalError";

const PaperDetail = (props) => {
  const [showLoading, setShowLoading] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [error, setError] = useState();

  const cookie = Cookies.get("authenticated");
  let id_user = cookie.split("/")[1];
  id_user = parseInt(id_user, 10);

  function starRatingHandler(newRating) {
    const formData = {
      id_user: id_user,
      id_paper: props.paper.id_paper,
      rating: newRating,
    };

    setShowLoading(true);

    instance
      .get(`papersuser-detail/${id_user}/${props.paper.id_paper}/`)
      .then((response) => {
        if (response.status === 200) {
          console.log("ya calificaste");
          updateRating(formData);
        } else if (response.status === 204) {
          console.log("No has calificado");
          createRating(formData);
        }
      })
      .catch((err) => {
        setShowModalError(!showModalError);
        setError(err.response);
      });
  }

  function createRating(formData) {
    instance
      .post("papersuser-create/", formData)
      .then((response) => {
        if (response.status === 201) {
          console.log("Si se creo!");
          setShowLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowLoading(false);
      });
  }

  function updateRating(formData) {
    instance
      .patch(
        `papersuser-update/${formData.id_user}/${formData.id_paper}/`,
        formData
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Si se actualizo");
          setShowLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowLoading(false);
      });
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
      {error && (
        <ModalError
          clicked={() => setShowModalError(!showModalError)}
          show={showModalError}
          modalClosedByBackdrop={() => setShowModalError(!showModalError)}
          error={error}
        />
      )}
    </div>
  );
};

export default PaperDetail;
