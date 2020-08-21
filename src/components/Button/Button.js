import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <div className="button__container">
      <button
        className="button"
        disabled={props.disabled}
        type={props.btnType}
        onClick={props.clicked}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
