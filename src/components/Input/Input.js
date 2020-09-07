import React from "react";
import "./Input.css";

const Input = (props) => {
  let inputElement = null;
  let validationError = null;

  let invalid = "";
  if (props.invalid && props.touched) {
    invalid = "invalid";
    validationError = <p className="error__message">Ingresa un valor valido</p>;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={`input ${invalid}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <input
          className={`input ${invalid}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={`input ${invalid}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="input__container">
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
