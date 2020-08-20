import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <div className="button__container">
      <button className="button" type="submit">
        {props.text}
      </button>
    </div>
  );
};

export default Button;
