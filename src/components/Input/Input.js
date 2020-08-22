import React from "react";
import "./Input.css";

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className="input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <input
          className="input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className="input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return <div className="input__container">{inputElement}</div>;
};

export default Input;
