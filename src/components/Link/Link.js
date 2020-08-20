import React from "react";
import "./Link.css";

const Link = (props) => {
  return (
    <div className="link__register">
      <p>
        {props.question} <a href="">{props.text}</a>
      </p>
    </div>
  );
};

export default Link;
