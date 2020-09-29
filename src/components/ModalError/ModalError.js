import React, { useState } from "react";

import Title from "components/Title/Title";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";

import { Redirect } from "react-router-dom";

const ModalError = (props) => {
  const [redirect, setRedirect] = useState(false);

  function reactivateAccountHandler() {
    setRedirect(!redirect);
  }

  return (
    <div>
      <Modal show={props.show} modalClosedByBackdrop={props.clicked}>
        <Title>Codigo error: {props.error.status}</Title>
        <p style={{ color: "white" }}>{props.error.data.message}</p>
        {props.error.status === 201 ? (
          <div>
            <p style={{ color: "white" }}>Deseas reactivar la cuenta?</p>
            <Button clicked={reactivateAccountHandler}>Reactivar</Button>
            <Button clicked={props.clicked} cancel noContainer>
              Cancelar
            </Button>
          </div>
        ) : (
          <Button clicked={props.clicked}>Aceptar</Button>
        )}
        {redirect && <Redirect to="/reactivate" />}
      </Modal>
    </div>
  );
};

export default ModalError;
