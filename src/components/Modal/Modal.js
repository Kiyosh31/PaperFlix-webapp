import React from "react";
import "./Modal.css";

import Backdrop from "components/Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <div>
      <Backdrop show={props.show} clicked={props.modalClosedByBackdrop} />
      <div
        className={`${props.transparent ? "modal__transparent" : "modal"} ${
          props.show ? "modal__open" : "modal__close"
        }`}
        onClick={props.clicked}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
