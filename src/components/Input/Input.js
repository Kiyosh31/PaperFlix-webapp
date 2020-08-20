import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <div className="input__container">
      <input
        type={props.type}
        className="input"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
