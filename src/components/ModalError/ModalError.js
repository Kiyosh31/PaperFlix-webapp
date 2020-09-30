import React, { useState } from "react";

import Title from "components/Title/Title";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";

import { Redirect } from "react-router-dom";
import instance from "axios-instance";
import Cookies from "js-cookie";
import { sha256 } from "js-sha256";

const ModalError = (props) => {
  const [redirect, setRedirect] = useState(false);

  function reactivateAccountHandler() {
    instance
      .patch(`user-activate/${props.error.data.id_user}/`)
      .then((response) => {
        if (response.status === 201) {
          let hash = sha256.create();
          hash.update(props.error.data.email + props.error.data.password);
          hash.hex();
          Cookies.set("authenticated", hash + "/" + response.data.id_user, {
            expires: 5,
          });
          setRedirect(true);
        }
      })
      .catch((err) => console.log(err));
  }

  let content = null;
  if (props.error.status === 201) {
    content = (
      <Modal show={props.show} modalClosedByBackdrop={props.clicked}>
        <Title>Error el usuario no esta activo</Title>
        <p style={{ color: "white" }}>{props.error.data.message}</p>
        <p style={{ color: "white" }}>Deseas reactivar la cuenta?</p>
        <Button clicked={reactivateAccountHandler}>Reactivar</Button>
        <Button clicked={props.clicked} cancel noContainer>
          Cancelar
        </Button>
        {redirect && <Redirect to="/home" />}
      </Modal>
    );
  } else if (props.error === 400 || props.error === 400) {
    content = (
      <Modal show={props.show} modalClosedByBackdrop={props.clicked}>
        <Title>Error al intentar iniciar sesion</Title>
        <p style={{ color: "white" }}>
          Tu cuenta esta desactivada o no existe, para poder continuar crea una
          cuenta o reactiva la que ya tienes
        </p>
        <Button clicked={props.clicked}>Aceptar</Button>
      </Modal>
    );
  }

  return <div>{content}</div>;
};

export default ModalError;
