import React from "react";
import "./Background.css";

const Background = (props) => {
  return (
    <div
      className="background"
      style={{ backgroundImage: "url(" + props.image + ")" }}
    >
      {props.children}
    </div>
  );
};

export default Background;
