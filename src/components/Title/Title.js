import React from "react";
import "./Title.css";

const Title = (props) => {
  return (
    <div>
      <h1 className="title">{props.children}</h1>
    </div>
  );
};

export default Title;
