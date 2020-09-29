import React from "react";

import Title from "components/Title/Title";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";

const ModalError = (props) => {
  return (
    <div>
      <Modal
        clicked={props.clicked}
        show={props.show}
        modalClosedByBackdrop={props.clicked}
      >
        <Title>Codigo error: {props.error.status}</Title>
        <p style={{ color: "white" }}>{props.error.data}</p>
        <Button clicked={props.clicked}>Aceptar</Button>
      </Modal>
    </div>
  );
};

export default ModalError;
