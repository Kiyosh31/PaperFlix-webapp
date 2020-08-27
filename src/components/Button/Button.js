import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <div>
      <div className="button__container">
        <button
          className={!props.style ? "button" : props.style}
          disabled={props.disabled}
          type={props.btnType}
          onClick={props.clicked}
        >
          {props.children}
        </button>
      </div>
    </div>
  );
};

export default Button;
