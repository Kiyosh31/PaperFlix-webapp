import React from "react";
import "./Modal.css";

import Backdrop from "components/Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <div>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={`modal ${props.show ? "modal_open" : "modal_close"}`}
        onClick={props.clicked}
      >
        {props.children}
        <button>Cierrame</button>
      </div>
    </div>
  );
};

export default Modal;
