import React from "react";
import "./Box.css";

const Box = (props) => {
  return (
    <div className="box">
      <div>{props.children}</div>
    </div>
  );
};

export default Box;
