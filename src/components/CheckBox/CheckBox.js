import React from "react";
import "./CheckBox.css";

const CheckBox = (props) => {
  return (
    <div>
      <div className="checkbox__container">
        <span>
          <input className="rememberme" type="checkbox" />
          <span>{props.text}</span>
        </span>
      </div>
    </div>
  );
};

export default CheckBox;
