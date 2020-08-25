import React from "react";
import "./Input.css";

const Input = (props) => {
  let inputElement = null;

  let invalid = "";
  if (props.invalid && props.touched) {
    invalid = "invalid";
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

  return <div className="input__container">{inputElement}</div>;
};

export default Input;
