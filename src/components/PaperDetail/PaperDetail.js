import React from "react";
import "./PaperDetail.css";

import Button from "components/Button/Button";
import StarRating from "components/StarRating/StarRating";
import Title from "components/Title/Title";
import instance from "axios-instance";
import Cookies from "js-cookie";

const PaperDetail = (props) => {
  const cookie = Cookies.get("authenticated");
  let id_user = cookie.split("/")[1];
  id_user = parseInt(id_user, 10);

  function starRatingHandler(newRating) {
    const formData = {
      id_user: id_user,
      id_paper: props.paper.id_paper,
      rating: newRating,
    };

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
      .catch((err) => console.log(err));
  }

  function createRating(formData) {
    instance
      .post("papersuser-create/", formData)
      .then((response) => {
        if (response.status === 201) {
          console.log("Si se creo!");
        }
      })
      .catch((err) => console.log(err));
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
        }
      })
      .catch((err) => console.log(err));
  }

  function paperClickHandler() {
    window.open(props.paper.url, "_blank");
  }

  return (
    <div className="paperdetail__container">
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
        <strong className="text_int">Categorias:</strong>{" "}
        {props.paper.category_name}
      </p>
      <StarRating changed={starRatingHandler} />
      <Button clicked={paperClickHandler}>Ver el documento</Button>
    </div>
  );
};

export default PaperDetail;
