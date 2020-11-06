import React from "react";
import "./ErrorModal.css";

import Button from "components/Button/Button";

const ErrorModal = (props) => {
  return (
    <div>
      <div className="backdrop" onClick={props.onClose} />
      <div className="modal">
        <h2 className="title">Un error ha ocurrido!</h2>
        <p className="text">{Object.values(props.text)[0]}</p>
        <Button clicked={props.onClose}>Aceptar</Button>
      </div>
    </div>
  );
};

export default ErrorModal;
