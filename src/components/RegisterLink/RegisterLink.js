import React from "react";
import { Link } from "react-router-dom";
import "./RegisterLink.css";

const RegisterLink = (props) => {
  return (
    <div className="link__register">
      <p>
        {props.question} <Link to={props.navigate}>{props.text}</Link>
      </p>
    </div>
  );
};

export default RegisterLink;
