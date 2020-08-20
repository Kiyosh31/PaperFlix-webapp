import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <div className="input__container">
      <input className="input" type="text" placeholder={props.placeholder} />
    </div>
  );
};

export default Input;
