import React from "react";
import "./SuccessModal.css";

import Button from "components/Button/Button";

const SuccessModal = (props) => {
  return (
    <div>
      <div className="backdrop" onClick={props.onClose} />
      <div className="modal">
        <h2 className="title">{props.data[0]}</h2>
        <p className="modal__text">{props.data[1]}</p>
        <Button clicked={props.onClose}>Aceptar</Button>
      </div>
    </div>
  );
};

export default SuccessModal;
